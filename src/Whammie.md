```mermaid
flowchart TB
    LoanType["Loan Type"]
    HomeDescription["Home Description"]
    TimeframeToPurchase_cnd{"Show Only For Purchase,"}
    TimeframeToPurchase["Timeframe To Purchase"]
    FirstTimeHomeBuyer_cnd{"Show Only For Purchase,"}
    FirstTimeHomeBuyer["First Time Home Buyer"]
    HomeValue_cnd{"Show Only For Cashout And Refinance,"}
    HomeValue["Home Value"]
    MortgageBalance_cnd{"Show Only For Cashout And Refinance"}
    MortgageBalance["Mortgage Balance"]
    Military["Military"]
    WorkingWithAnAgent["Working With An Agent"]
    PurchasePrice_cnd{"Show Only For Purchase,"}
    PurchasePrice["Purchase Price"]
    DownPayment_cnd{"Show Only For Purchase,"}
    DownPayment["Down Payment"]
    CreditProfile["Credit Profile"]
    PersonalInfo["Personal Info"]
    TimeframeToPurchase_cnd--"Yes"-->TimeframeToPurchase
    TimeframeToPurchase_cnd--"No"-->FirstTimeHomeBuyer_cnd
    FirstTimeHomeBuyer_cnd--"Yes"-->FirstTimeHomeBuyer
    FirstTimeHomeBuyer_cnd--"No"-->HomeValue_cnd
    HomeValue_cnd--"Yes"-->HomeValue
    HomeValue_cnd--"No"-->MortgageBalance_cnd
    MortgageBalance_cnd--"Yes"-->MortgageBalance
    MortgageBalance_cnd--"No"-->Military
    PurchasePrice_cnd--"Yes"-->PurchasePrice
    PurchasePrice_cnd--"No"-->DownPayment_cnd
    DownPayment_cnd--"Yes"-->DownPayment
    DownPayment_cnd--"No"-->CreditProfile
    LoanType--" "-->HomeDescription
    HomeDescription--" "-->TimeframeToPurchase_cnd
    TimeframeToPurchase--" "-->FirstTimeHomeBuyer_cnd
    FirstTimeHomeBuyer--" "-->HomeValue_cnd
    HomeValue--" "-->MortgageBalance_cnd
    MortgageBalance--" "-->Military
    Military--" "-->WorkingWithAnAgent
    WorkingWithAnAgent--" "-->PurchasePrice_cnd
    PurchasePrice--" "-->DownPayment_cnd
    DownPayment--" "-->CreditProfile
    CreditProfile--" "-->PersonalInfo

```