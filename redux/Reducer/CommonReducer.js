import * as actions from '../actionType/common.actionType';

const initialState = {
  loading: false,
};

function CommonReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOADING_SHOW:
      return {
        loading: true,
      };

    case actions.LOADING_HIDE:
      return {
        loading: false,
      };

    default:
      return state;
  }
}
export default CommonReducer;
