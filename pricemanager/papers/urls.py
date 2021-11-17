from rest_framework import routers, urlpatterns
from .api import PapersViewSet


router = routers.DefaultRouter()
router.register('api/papers', PapersViewSet, 'papers')

urlpatterns = router.urls
