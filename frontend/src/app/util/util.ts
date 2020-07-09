import { Subscription } from 'rxjs';

export const unsubscribe = (subscription: Subscription): void => {
    if (subscription && !subscription.closed) {
        subscription.unsubscribe();
    }
};
