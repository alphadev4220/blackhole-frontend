import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { WEBSITE_URL } from 'constants'
import constants from '../../src/constants'

const meta = {
    name: constants.APP_NAME,
    description: constants.APP_DESCRIPTION,
    domain: constants.APP_DOMAIN,
    url: constants.APP_URL,
    twitter: {
      username: '@BlackHoleLLC',
    },
  }

export const DefaultAppSeo = () => {
  const router = useRouter()
  if (!router){
    return <div></div>
  }
  return (
    <DefaultSeo
      canonical={meta.url + (router.asPath || '')}
      defaultTitle={meta.name}
      description={meta.description}
      openGraph={{
        title: meta.name,
        description: meta.description,
        type: 'website',
        site_name: meta.name,
        images: [{ url: `${constants.APP_URL}/social.png` }],
      }}
      titleTemplate={`%s | ${meta.name}`}
      twitter={{
        cardType: 'summary_large_image',
        handle: meta.twitter.username,
        site: meta.twitter.username,
      }}
    />
  )
}
