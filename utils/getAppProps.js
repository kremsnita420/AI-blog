import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "../lib/mongodb";

async function getAppProps(ctx) {
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = await client.db('aiblog');
    const user = await db.collection('users').findOne({
        auth0Id: userSession.user.sub
    });

    if (!user) {
        return {
            availableTokens: 0,
            posts: []
        }
    };

    const posts = await db.collection('posts').find({
        userId: user._id
    }).sort({
        created: -1,
    }).toArray();

    return {
        availableTokens: user.availableTokens,
        posts: posts.map(({ created, _id, userId, ...rest }) => ({
            _id: _id.toString(),
            created: created.toString(),
            ...rest
        })),
        postId: ctx.params?.postId || null
    };
}
export default getAppProps