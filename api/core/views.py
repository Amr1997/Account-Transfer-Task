from decimal import Decimal
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from .models import Account
from .serializers import AccountSerializer
import pandas as pd


class ImportAccountsView(APIView):
    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            df = pd.read_csv(file)
            accounts = [
                Account(
                    account_number=row['ID'],
                    name=row['Name'],
                    balance=row['Balance']
                )
                for _, row in df.iterrows()
            ]
            Account.objects.bulk_create(accounts, ignore_conflicts=True)
            return Response({"message": "Accounts imported successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AccountListView(APIView):
    def get(self, request):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)

class AccountDetailView(APIView):
    def get(self, request, account_number):
        try:
            account = Account.objects.get(account_number=account_number)
            serializer = AccountSerializer(account)
            return Response(serializer.data)
        except Account.DoesNotExist:
            return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)

class TransferFundsView(APIView):
    @transaction.atomic
    def post(self, request):
        from_account_num = request.data.get('from_account')
        to_account_num = request.data.get('to_account')
        amount = request.data.get('amount')

        try:
            amount = Decimal(amount)
        except (ValueError, TypeError):
            return Response({"error": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            from_account = Account.objects.select_for_update().get(account_number=from_account_num)
            to_account = Account.objects.select_for_update().get(account_number=to_account_num)
        except Account.DoesNotExist:
            return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)

        if from_account.balance < amount:
            return Response({"error": "No enough funds"}, status=status.HTTP_400_BAD_REQUEST)

        # Perform the transfer
        from_account.balance -= amount
        to_account.balance += amount
        from_account.save()
        to_account.save()

        return Response({"message": "Transfer successful"}, status=status.HTTP_200_OK)
