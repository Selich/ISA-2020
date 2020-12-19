import NextAuth from 'next-auth'

const options = {
  site: process.env.NEXTAUTH_URL
}

// @ts-ignore
export default (req, res) => NextAuth(req, res, options)
