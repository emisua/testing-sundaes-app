import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePatch: './images/chocolate.png' },
        { name: 'Vanilla', imagePatch: './images/vanilla.png' },
      ])
    )
  }),
]
