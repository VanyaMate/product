import { CounterSchema } from "../types/counterSchema";
import {
    counterActions,
    counterReducer,
} from '@/components/entities/_temp_/Counter/model/slice/counterSlice.ts';



describe('CounterSlice', () => {
    test('Increment', () => {
        const state: CounterSchema = { value: 1 };
        expect(counterReducer(state as CounterSchema, counterActions.increment())).toEqual(
            {
                value: 2,
            },
        );
    });
    test('Decrement', () => {
        const state: CounterSchema = { value: 1 };
        expect(counterReducer(state as CounterSchema, counterActions.decrement())).toEqual(
            {
                value: 0,
            },
        );
    });
    test('With empty state', () => {
        expect(counterReducer(undefined, counterActions.increment())).toEqual(
            {
                value: 1,
            },
        );
    });
});