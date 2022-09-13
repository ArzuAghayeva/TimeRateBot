const expect = require('chai').expect
const duration = require('./time')

it('calculates total time am to am same day', () => {
    expect(duration('10:10 am', '10:30 am')).to.equal(20)
})

it('calculates total time am to am same day', () => {
    expect(duration('10:10 am', '11:30 am')).to.equal(80)
})

it('calculates total time from am to pm same day', () => {
    expect(duration('10:10 am', '1:30 pm')).to.equal(200)
})

it('calculates total time from pm to pm same day', () => {
    expect(duration('1:10 pm', '1:30 pm')).to.equal(20)
})

it('calculates total time from pm one day to am next day', () => {
    expect(duration('1:10 pm', '2:30 am')).to.equal(800)
})

it('calculates total time am one day to am next day', () => {
    expect(duration('10:10 am', '9:30 am')).to.equal(1400)
})

it('calculates total time from pm one day to am next day', () => {
    expect(duration('1:10 pm', '10:30 am')).to.equal(1280)
})

it('calculates total time from pm one day to pm next day', () => {
    expect(duration('1:10 pm', '1:05 pm')).to.equal(1435)
})

