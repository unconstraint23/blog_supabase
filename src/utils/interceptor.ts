import { createClient } from '@/lib/supabase/server'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export const withAuth = async (
  ctx: GetServerSidePropsContext,
  next: () => Promise<GetServerSidePropsResult<any>>
): Promise<GetServerSidePropsResult<any>> => {
  const supabase = await createClient({request: ctx.req, response: ctx.res})

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return next()
}
