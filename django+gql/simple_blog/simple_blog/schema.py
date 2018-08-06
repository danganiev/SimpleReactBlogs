import graphene

from .posts import schema as posts_schema


class Query(posts_schema.PostsQuery, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass

schema = graphene.Schema(query=Query)