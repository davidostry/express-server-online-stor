import express from 'express'

const router = express.Router()

const products = [
  {
    "customerId": 1,
    "cart": [],
    "createdAt": "2026-01-15T10:30:00Z"
  },
  {
    "customerId": 2,
    "cart": [],
    "createdAt": "2026-02-08T14:20:00Z"
  },
  {
    "customerId": 3,
    "cart": [],
    "createdAt": "2026-03-01T09:45:00Z"
  },
  {
    "customerId": 4,
    "cart": [],
    "createdAt": "2026-03-18T18:10:00Z"
  },
  {
    "customerId": 5,
    "cart": [],
    "createdAt": "2026-04-05T11:55:00Z"
  },
  {
    "customerId": 6,
    "cart": [],
    "createdAt": "2026-04-22T16:40:00Z"
  },
  {
    "customerId": 7,
    "cart": [],
    "createdAt": "2026-05-10T08:15:00Z"
  },
  {
    "customerId": 8,
    "cart": [],
    "createdAt": "2026-06-01T13:30:00Z"
  },
  {
    "customerId": 9,
    "cart": [],
    "createdAt": "2026-06-18T20:05:00Z"
  },
  {
    "customerId": 10,
    "cart": [],
    "createdAt": "2026-07-01T12:00:00Z"
  }
]

router.get("/", (req, res)=>{
    res.json({products})
})

export default router