import withSession from '../../session';

export const requirePageAuth = (inner) => {
  return withSession(async (context) => {
    const user = await context.req.session.get('user');
  
    if (!user || !user?.isLoggedIn) {
      context.res.writeHead(301, {Location: '/login'});
      context.res.end();
      return {
        props: {}
      };
    }
  
    return inner ? inner(context, auth) : { props: { user } };
  });
}