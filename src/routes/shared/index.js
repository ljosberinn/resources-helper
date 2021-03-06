import * as ROUTES from '../../constants/routes';
import LoadableComponent from '../loadUtils';

export const SHARED_ROUTES = {
  [ROUTES.TOS.routerPath]: LoadableComponent(() =>
    import(/* webpackChunkName: "shared.tos" */ './TosRoute'),
  ),
  [ROUTES.PRIVACY_POLICY.routerPath]: LoadableComponent(() =>
    import(
      /* webpackChunkName: "shared.privacypolicy" */ './PrivacyPolicyRoute'
    ),
  ),

  [ROUTES.API.routerPath]: LoadableComponent(() =>
    import(/* webpackChunkName: "shared.api" */ './APIPage'),
  ),
};

export const LANGUAGE_ROUTE = LoadableComponent(() =>
  import(/* webpackChunkName: "shared.language" */ './LanguageRoute'),
);
