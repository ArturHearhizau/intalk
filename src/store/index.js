import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers/index';
import checkVatMiddleware from '../middleware/checkVat';
import VatMiddleware from '../middleware/VatMiddleware';
import VatHistoryMiddleware from '../middleware/VatHistoryMiddleware';
import UserMiddleware from '../middleware/UserMiddleware';
import AdminMiddleware from '../middleware/AdminMiddleware';

export default function configureStore(initialState) {
    const store = createStore(
        reducers,
        applyMiddleware(
            checkVatMiddleware,
            VatHistoryMiddleware,
            VatMiddleware,
            UserMiddleware,
            AdminMiddleware
      )
    );

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer)
        });
    }
    return store;
}
