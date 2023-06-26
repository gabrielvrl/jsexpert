import { expect, describe, test, jest } from '@jest/globals';
import Payment from '../src/events/payment';
import Marketing from '../src/observers/marketing';
import Shipment from '../src/observers/shipment';
import PaymentSubject from '../src/subjects/paymentSubject';

describe('Test Suite for Observer Patterns', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  test('#PaymentSubject notify observers', () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn()
    };
    const data = 'hello world';
    const expected = data;

    subject.subscribe(observer);
    subject.notify(data);
    expect(observer.update).toHaveBeenCalledWith(expected);
  })
  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn()
    };
    const data = 'hello world';
    const expected = data;

    subject.subscribe(observer);
    subject.unsubscribe(observer);
    subject.notify(data);
    expect(observer.update).not.toHaveBeenCalledWith(expected);
  })
  test('#Payment should notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);

    const paymentSubjectNotifierSpy = jest.spyOn(payment.paymentSubject, payment.paymentSubject.notify.name);

    const data = {
      userName: 'John Doe',
      id: Date.now()
    }

    payment.creditCard(data);

    expect(paymentSubjectNotifierSpy).toHaveBeenCalledTimes(1);
  })
  test('#All should notify subscribes after a credit card payment', () => {
    const subject = new PaymentSubject();
    const shipment = new Shipment();
    const marketing = new Marketing();
    
    const shipmentSpy = jest.spyOn(shipment, shipment.update.name);
    const marketingSpy = jest.spyOn(marketing, marketing.update.name);
    
    subject.subscribe(shipment);
    subject.subscribe(marketing);

    const payment = new Payment(subject);
    const data = {
      userName: 'Iron Man',
      id: Date.now()
    };

    payment.creditCard(data);

    expect(shipmentSpy).toBeCalledWith(data);
    expect(marketingSpy).toBeCalledWith(data);
  })
})