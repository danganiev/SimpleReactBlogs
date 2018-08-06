import graphene

from .models import Post

class PostsQuery(graphene.ObjectType):
    hello = graphene.String(name=graphene.String(default_value="stranger"))

    def resolve_all_posts(self, info, name):
        return Post.objects.all()

schema = graphene.Schema(query=PostsQuery)