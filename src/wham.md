```mermaid
flowchart TB
    Start(["Start"])
    Loan_Type["Loan Type"]
    Home_Description["Home Description"]
    Property_Use["Property Use"]
    Loan_Type_=_Purchase?{"Loan Type = Purchase?"}
    ttp["Timeframe to Purchase"]
    First_Time_Home_Buyer["First Time Home Buyer"]
    d1{"Loan Type = Refinance?"}
    lprc["Loan Purpose Refi slash Cashout"]
    hv["Home Value"]
    d2{"Loan Purpose = Refi slash Cashout"}
    mb["Mortgage Balance"]
    d3{"Loan Type = Cashout<br/>OR Loan Purpose = Cashout Refi<br/>OR Loan Purpose = Take Cash Out"}
    a9["Additional Funds"]
    a10["Military"]
    Loan_Type_=_Purchase{"Loan Type = Purchase"}
    a11["Working w/Agent"]
    Purchase_Price["Purchase Price"]
    Down_Payment["Down Payment"]
    Credit_Profile["Credit Profile"]
    ltrsco{"Loan Type = Refi slash C.O."}
    Second_Mortgage["Second Mortgage"]
    qpv{"QPV = NoEmp"}
    d7{"Loan Type = Purchase<br/>And F.T.H.B. = No"}
    Late_Payments["Late Payments"]
    Foreclosure["Foreclosure"]
    Employment_Status["Employment Status"]
    Bankruptcy["Bankruptcy"]
    Name["Name"]
    Home_Phone["Home Phone"]
    Email["Email"]
    anz["Address and Zip"]
    a24["Submit Transaction"]
    d8{"Error"}
    redirect["Redirect to slash thank-you"]
    End(["End"])
    Loan_Type_=_Purchase?--"Yes"-->ttp
    Loan_Type_=_Purchase?--"No"-->d1
    First_Time_Home_Buyer--" "-->a10
    d1--"Yes"-->lprc
    d1--"No"-->hv
    d2--"Yes"-->mb
    d2--"No"-->d3
    d3--"Yes"-->a9
    d3--"No"-->a10
    Loan_Type_=_Purchase--"Yes"-->a11
    Loan_Type_=_Purchase--"No"-->Credit_Profile
    ltrsco--"Yes"-->Second_Mortgage
    ltrsco--"No"-->qpv
    qpv--"No"-->Employment_Status
    qpv--"Yes"-->d7
    d7--"No"-->Bankruptcy
    d7--"Yes"-->Late_Payments
    Foreclosure--" "-->Bankruptcy
    d8--"Yes"-->anz
    d8--"No"-->redirect
    Start--" "-->Loan_Type
    Loan_Type--" "-->Home_Description
    Home_Description--" "-->Property_Use
    Property_Use--" "-->Loan_Type_=_Purchase?
    ttp--" "-->First_Time_Home_Buyer
    First_Time_Home_Buyer--" "-->d1
    lprc--" "-->hv
    hv--" "-->d2
    mb--" "-->d3
    a9--" "-->a10
    a10--" "-->Loan_Type_=_Purchase
    a11--" "-->Purchase_Price
    Purchase_Price--" "-->Down_Payment
    Down_Payment--" "-->Credit_Profile
    Credit_Profile--" "-->ltrsco
    Second_Mortgage--" "-->qpv
    Late_Payments--" "-->Foreclosure
    Foreclosure--" "-->Employment_Status
    Employment_Status--" "-->Bankruptcy
    Bankruptcy--" "-->Name
    Name--" "-->Home_Phone
    Home_Phone--" "-->Email
    Email--" "-->anz
    anz--" "-->a24
    a24--" "-->d8
    redirect--" "-->End

```