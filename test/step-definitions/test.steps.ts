import { binding, given, then } from 'cucumber-tsflow';
import { assert } from 'chai';

@binding()
export class Test {
    private res: number = 0;

    @given(/given (\d*)/)
    public givenAnAccountWithStartingBalance(amount: number) {
        this.res = amount;
    }

    @then(/result should be (\d*)/)
    public accountBalanceShouldEqual(expectedAmount: number) {
        assert.equal(this.res, expectedAmount);
    }
}
