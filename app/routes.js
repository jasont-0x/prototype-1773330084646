const router = require('govuk-prototype-kit/lib/utils').getRouter()

function generateReference(prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

// Start
router.get('/', function (req, res) {
  res.render('start')
})

router.get('/child-school-age', function (req, res) {
  res.render('child-school-age', { errors: null, data: req.session.data })
})

router.post('/child-school-age', function (req, res) {
  const answer = req.session.data['child-school-age']
  if (!answer || !answer.toString().trim()) {
    return res.render('child-school-age', {
      errors: { 'child-school-age': 'Select yes if your child is school age' },
      data: req.session.data
    })
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-child-school-age')
  }
  res.redirect('/child-name')
})

router.get('/ineligible-child-school-age', function (req, res) {
  res.render('ineligible-child-school-age')
})

router.get('/child-name', function (req, res) {
  res.render('child-name', { errors: null, data: req.session.data })
})

router.post('/child-name', function (req, res) {
  const answer = req.session.data['child-name']
  if (!answer || !answer.toString().trim()) {
    return res.render('child-name', {
      errors: { 'child-name': 'Enter your child\'s full name' },
      data: req.session.data
    })
  }

  res.redirect('/child-school')
})

router.get('/child-school', function (req, res) {
  res.render('child-school', { errors: null, data: req.session.data })
})

router.post('/child-school', function (req, res) {
  const answer = req.session.data['child-school']
  if (!answer || !answer.toString().trim()) {
    return res.render('child-school', {
      errors: { 'child-school': 'Enter your child\'s school name' },
      data: req.session.data
    })
  }

  res.redirect('/receive-benefits')
})

router.get('/receive-benefits', function (req, res) {
  res.render('receive-benefits', { errors: null, data: req.session.data })
})

router.post('/receive-benefits', function (req, res) {
  const answer = req.session.data['receive-benefits']
  if (!answer || !answer.toString().trim()) {
    return res.render('receive-benefits', {
      errors: { 'receive-benefits': 'Select yes if you receive qualifying benefits' },
      data: req.session.data
    })
  }

  res.redirect('/national-insurance')
})

router.get('/national-insurance', function (req, res) {
  res.render('national-insurance', { errors: null, data: req.session.data })
})

router.post('/national-insurance', function (req, res) {
  const answer = req.session.data['national-insurance']
  if (!answer || !answer.toString().trim()) {
    return res.render('national-insurance', {
      errors: { 'national-insurance': 'Enter your National Insurance number' },
      data: req.session.data
    })
  }

  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers', { data: req.session.data })
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FSM')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation', { data: req.session.data })
})

module.exports = router
