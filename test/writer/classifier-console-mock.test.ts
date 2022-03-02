import { ClassifyConsole } from '../../src/classifier/classify-console';

export class MockClassifierConsole implements ClassifyConsole {
    write(outputs: string[][]): void {
        outputs.forEach((content) => this.called.push(content.join('\n') + '\n'));
    }
    private _called: string[] = [];
    public get called(): string[] {
        return this._called;
    }
}
