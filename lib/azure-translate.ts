type SupportedLocale = 'vi' | 'en' | 'fr'

export interface TranslationInput {
  locale: SupportedLocale
  name?: string
  title?: string
  description?: string
  category?: string
}

export interface PageTranslationFields {
  title?: string
  title_en?: string
  title_fr?: string
  content?: string
  content_en?: string
  content_fr?: string
  metaTitle?: string
  metaTitle_en?: string
  metaTitle_fr?: string
  metaDescription?: string
  metaDescription_en?: string
  metaDescription_fr?: string
}

export interface TeamTranslationFields {
  name?: string
  name_en?: string
  name_fr?: string
  position?: string
  position_en?: string
  position_fr?: string
  bio?: string
  bio_en?: string
  bio_fr?: string
}

interface AzureConfig {
  endpoint?: string
  key?: string
  region?: string
}

function getAzureConfig(): AzureConfig | null {
  const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT
  const key = process.env.AZURE_TRANSLATOR_KEY
  const region = process.env.AZURE_TRANSLATOR_REGION

  if (!endpoint || !key || !region) {
    return null
  }

  return { endpoint, key, region }
}

async function translateTexts(
  texts: string[],
  toLocales: SupportedLocale[],
  config: AzureConfig
): Promise<Record<SupportedLocale, string[]>> {
  if (texts.length === 0) {
    return { en: [], fr: [], vi: [] }
  }

  const url = `${config.endpoint}/translate?api-version=3.0&from=vi&${toLocales
    .map((loc) => `to=${loc}`)
    .join('&')}`

  const body = texts.map((text) => ({ text }))

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': config.key as string,
      'Ocp-Apim-Subscription-Region': config.region as string,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Azure translate failed: ${res.status} ${res.statusText}`)
  }

  const data = (await res.json()) as Array<{
    translations: { text: string; to: SupportedLocale }[]
  }>

  const result: Record<SupportedLocale, string[]> = { en: [], fr: [], vi: [] }
  toLocales.forEach((loc) => {
    result[loc] = data.map((item) => {
      const t = item.translations.find((tr) => tr.to === loc)
      return t?.text ?? ''
    })
  })

  return result
}

/**
 * Auto-translate missing fields (name/title/description/category) from VI -> EN/FR.
 * - Only fills when base VI exists.
 * - Does NOT overwrite existing translations.
 * - If Azure config missing or any error occurs, returns original translations unchanged.
 */
export async function translateMissing(
  translations: TranslationInput[]
): Promise<TranslationInput[]> {
  const config = getAzureConfig()
  if (!config) return translations

  const baseVi = translations.find((t) => t.locale === 'vi')
  if (!baseVi) return translations

  const fields: Array<keyof TranslationInput> = ['name', 'title', 'description', 'category']
  const sourceTexts = fields
    .map((field) => baseVi[field])
    .filter((text): text is string => Boolean(text && text.trim()))

  if (sourceTexts.length === 0) return translations

  const targetLocales: SupportedLocale[] = ['en', 'fr']

  try {
    const translated = await translateTexts(sourceTexts, targetLocales, config)

    const fieldOrder: Array<keyof TranslationInput> = fields.filter((field) =>
      Boolean(baseVi[field]?.trim())
    )

    const ensureLocale = (locale: SupportedLocale) => {
      let existing = translations.find((t) => t.locale === locale)
      if (!existing) {
        existing = { locale }
        translations.push(existing)
      }
      return existing
    }

    targetLocales.forEach((locale) => {
      const target = ensureLocale(locale)
      const textsForLocale = translated[locale]
      fieldOrder.forEach((field, idx) => {
        const value = textsForLocale[idx]
        if (!value) return
        const current = target[field]
        if (!current || current.trim() === '') {
          const targetRecord = target as unknown as Record<string, string | SupportedLocale>
          targetRecord[field as string] = value
        }
      })
    })

    return translations
  } catch (error) {
    console.error('translateMissing error:', error)
    return translations
  }
}

/**
 * Auto-translate missing Page fields (title, content, metaTitle, metaDescription) from VI -> EN/FR.
 * - Only fills when base VI exists.
 * - Does NOT overwrite existing translations.
 * - If Azure config missing or any error occurs, returns original fields unchanged.
 */
export async function translatePageFields(
  fields: PageTranslationFields
): Promise<PageTranslationFields> {
  const config = getAzureConfig()
  if (!config) return fields

  const result = { ...fields }
  const targetLocales: SupportedLocale[] = ['en', 'fr']

  try {
    // Translate title
    if (fields.title && (!fields.title_en || !fields.title_fr)) {
      const texts = [fields.title]
      const translated = await translateTexts(texts, targetLocales, config)
      
      if (!fields.title_en && translated.en[0]) {
        result.title_en = translated.en[0]
      }
      if (!fields.title_fr && translated.fr[0]) {
        result.title_fr = translated.fr[0]
      }
    }

    // Translate content
    if (fields.content && (!fields.content_en || !fields.content_fr)) {
      const texts = [fields.content]
      const translated = await translateTexts(texts, targetLocales, config)
      
      if (!fields.content_en && translated.en[0]) {
        result.content_en = translated.en[0]
      }
      if (!fields.content_fr && translated.fr[0]) {
        result.content_fr = translated.fr[0]
      }
    }

    // Translate metaTitle
    if (fields.metaTitle && (!fields.metaTitle_en || !fields.metaTitle_fr)) {
      const texts = [fields.metaTitle]
      const translated = await translateTexts(texts, targetLocales, config)
      
      if (!fields.metaTitle_en && translated.en[0]) {
        result.metaTitle_en = translated.en[0]
      }
      if (!fields.metaTitle_fr && translated.fr[0]) {
        result.metaTitle_fr = translated.fr[0]
      }
    }

    // Translate metaDescription
    if (fields.metaDescription && (!fields.metaDescription_en || !fields.metaDescription_fr)) {
      const texts = [fields.metaDescription]
      const translated = await translateTexts(texts, targetLocales, config)
      
      if (!fields.metaDescription_en && translated.en[0]) {
        result.metaDescription_en = translated.en[0]
      }
      if (!fields.metaDescription_fr && translated.fr[0]) {
        result.metaDescription_fr = translated.fr[0]
      }
    }

    return result
  } catch (error) {
    console.error('translatePageFields error:', error)
    return fields
  }
}

/**
 * Auto-translate missing TeamMember fields (name, position, bio) from VI -> EN/FR.
 * - Only fills when base VI exists.
 * - Does NOT overwrite existing translations.
 * - If Azure config missing or any error occurs, returns original fields unchanged.
 */
export async function translateTeamFields(
  fields: TeamTranslationFields
): Promise<TeamTranslationFields> {
  const config = getAzureConfig()
  if (!config) return fields

  const result = { ...fields }
  const targetLocales: SupportedLocale[] = ['en', 'fr']

  try {
    // Translate name
    if (fields.name && (!fields.name_en || !fields.name_fr)) {
      const texts = [fields.name]
      const translated = await translateTexts(texts, targetLocales, config)
      
      if (!fields.name_en && translated.en[0]) {
        result.name_en = translated.en[0]
      }
      if (!fields.name_fr && translated.fr[0]) {
        result.name_fr = translated.fr[0]
      }
    }

    // Translate position
    if (fields.position && (!fields.position_en || !fields.position_fr)) {
      const texts = [fields.position]
      const translated = await translateTexts(texts, targetLocales, config)
      
      if (!fields.position_en && translated.en[0]) {
        result.position_en = translated.en[0]
      }
      if (!fields.position_fr && translated.fr[0]) {
        result.position_fr = translated.fr[0]
      }
    }

    // Translate bio
    if (fields.bio && (!fields.bio_en || !fields.bio_fr)) {
      const texts = [fields.bio]
      const translated = await translateTexts(texts, targetLocales, config)
      
      if (!fields.bio_en && translated.en[0]) {
        result.bio_en = translated.en[0]
      }
      if (!fields.bio_fr && translated.fr[0]) {
        result.bio_fr = translated.fr[0]
      }
    }

    return result
  } catch (error) {
    console.error('translateTeamFields error:', error)
    return fields
  }
}
