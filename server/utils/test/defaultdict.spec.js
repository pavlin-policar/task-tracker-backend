import defaultdict from '../defaultdict';

import expect from 'expect';


describe('defaultdict', () => {
  it('should set the default value when trying to access the property for the first time', () => {
    const dict = defaultdict(Array);
    expect(dict.foo).toEqual([]);
  });
});
