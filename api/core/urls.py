from django.urls import path
from .views import ImportAccountsView, AccountListView, AccountDetailView, TransferFundsView

urlpatterns = [
    path('import/', ImportAccountsView.as_view(), name='import-accounts'),
    path('accounts/', AccountListView.as_view(), name='list-accounts'),
    path('accounts/<str:account_number>/', AccountDetailView.as_view(), name='account-detail'),
    path('transfer/', TransferFundsView.as_view(), name='transfer-funds'),
]
