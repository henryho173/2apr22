const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
const app = express()

module.exports = router

//Getting all
router.get("/", async (req, res) => {
res.setHeader("Access-Control-Allow-Origin", "https://au.bot.joseflegal.com")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
res.json({
  "type": "select",
  "possible_answers": [
    {"text": "Yes, continue"},
    {"text": "No, tell me more"},
    {"text": "Generate a document for me"}
  ],
})

 });

//Getting one
router.get('/:id', getSubscriber, (req, res) => {
  res.send(res.subscriber.name)

})

//Creating one
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
try {
  const newSubscriber = await subscriber.save()
  res.status(201).json(newSubscriber)
} catch (err) {
  res.status(400).json({ message: err.message})
}
})
//Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedSubScriber = await res.subscriber.save()
    res.json(updatedSubScriber)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
})
//Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted subscriber'})
  } catch (err) {
    res.status(500).json({message: err.message })

  }

})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber'})
    }
  } catch (err) {
    return res.status(500).json({ message: err.message})

  }
  res.subscriber = subscriber
  next()
}
