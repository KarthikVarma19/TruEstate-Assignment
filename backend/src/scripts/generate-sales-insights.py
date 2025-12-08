import pandas as pd

df = pd.read_csv("../../data/truestate_assignment_dataset.csv")

def get_unique_tags(tag_series):
    tags = set()
    for x in tag_series.dropna():
        for t in x.split(","):
            tags.add(t.strip())
    return tags

for col in df.columns:
    if col == "Tags":
        print("\nColumn: Tags")
        print(get_unique_tags(df[col]))
    else:
        print(f"\nColumn: {col}")
        print(df[col].unique())

"""
Column: Transaction ID
[      1       2       3 ...  999998  999999 1000000]

Column: Date
['2023-03-23' '2021-01-30' '2022-08-23' ... '2021-10-07' '2022-10-28'
 '2023-05-24']

Column: Customer ID
['CUST-40823' 'CUST-79592' 'CUST-53317' ... 'CUST-49225' 'CUST-18007'
 'CUST-10930']

Column: Customer Name
['Neha Khan' 'Prerna Mehta' 'Arjun Das' 'Zoya Joshi' 'Anjali Yadav'
 'Suresh Iyer' 'Ritika Chopra' 'Mahesh Mehta' 'Suresh Sharma'
 'Ritika Joshi' 'Sanjay Bansal' 'Farhan Khan' 'Prerna Chopra'
 'Anjali Agarwal' 'Amit Sharma' 'Anjali Reddy' 'Kabir Yadav'
 'Farhan Gupta' 'Aisha Gupta' 'Rahul Verma' 'Amit Verma' 'Pooja Singh'
 'Karan Gupta' 'Ritika Bansal' 'Kabir Mehta' 'Mahesh Reddy'
 'Alisha Bansal' 'Kabir Reddy' 'Zoya Sharma' 'Divya Singh' 'Vivek Patel'
 'Zoya Bansal' 'Mahesh Iyer' 'Anjali Sharma' 'Ritika Verma' 'Divya Bansal'
 'Ritika Patel' 'Rahul Reddy' 'Rahul Nair' 'Alisha Agarwal' 'Arjun Verma'
 'Nisha Iyer' 'Aisha Iyer' 'Vivek Chopra' 'Alisha Yadav' 'Kabir Das'
 'Simran Singh' 'Anjali Patel' 'Mahesh Yadav' 'Alisha Chopra'
 'Sneha Joshi' 'Sneha Bansal' 'Sanjay Das' 'Alisha Iyer' 'Nisha Singh'
 'Alisha Das' 'Simran Das' 'Kabir Khan' 'Neha Patel' 'Karan Agarwal'
 'Farhan Patel' 'Mahesh Joshi' 'Suresh Khan' 'Rohan Nair' 'Zoya Mehta'
 'Varun Chopra' 'Aisha Sharma' 'Ritika Das' 'Ritika Yadav' 'Amit Nair'
 'Mahesh Das' 'Simran Chopra' 'Sanjay Reddy' 'Aisha Singh' 'Arjun Patel'
 'Varun Joshi' 'Aisha Yadav' 'Divya Chopra' 'Farhan Chopra' 'Aisha Khan'
 'Arjun Gupta' 'Alisha Reddy' 'Simran Gupta' 'Aisha Chopra' 'Farhan Mehta'
 'Anjali Chopra' 'Mahesh Verma' 'Zoya Verma' 'Aisha Nair' 'Prerna Agarwal'
 'Suresh Patel' 'Prerna Reddy' 'Divya Mehta' 'Simran Reddy' 'Farhan Verma'
 'Pooja Verma' 'Arjun Agarwal' 'Neha Bansal' 'Rohan Gupta' 'Suresh Verma'
 'Arjun Reddy' 'Mahesh Sharma' 'Varun Sharma' 'Zoya Das' 'Amit Mehta'
 'Mahesh Bansal' 'Arjun Nair' 'Alisha Mehta' 'Suresh Chopra' 'Kabir Nair'
 'Kabir Joshi' 'Vivek Singh' 'Neha Nair' 'Nisha Patel' 'Karan Singh'
 'Rahul Das' 'Amit Iyer' 'Arjun Mehta' 'Arjun Joshi' 'Suresh Joshi'
 'Rahul Iyer' 'Alisha Nair' 'Karan Das' 'Sneha Gupta' 'Varun Das'
 'Nisha Nair' 'Amit Yadav' 'Mahesh Singh' 'Arjun Chopra' 'Vivek Verma'
 'Amit Agarwal' 'Karan Mehta' 'Neha Sharma' 'Ritika Khan' 'Vivek Sharma'
 'Varun Verma' 'Sanjay Singh' 'Sanjay Gupta' 'Divya Patel' 'Farhan Das'
 'Sneha Iyer' 'Alisha Sharma' 'Farhan Joshi' 'Rahul Mehta' 'Rohan Reddy'
 'Vivek Khan' 'Simran Bansal' 'Prerna Bansal' 'Alisha Joshi' 'Mahesh Nair'
 'Divya Reddy' 'Aisha Verma' 'Rohan Yadav' 'Nisha Khan' 'Varun Singh'
 'Ritika Nair' 'Divya Nair' 'Kabir Chopra' 'Rahul Bansal' 'Suresh Agarwal'
 'Nisha Joshi' 'Anjali Nair' 'Zoya Iyer' 'Zoya Chopra' 'Pooja Patel'
 'Amit Patel' 'Vivek Bansal' 'Rahul Khan' 'Prerna Patel' 'Nisha Gupta'
 'Rahul Sharma' 'Divya Joshi' 'Varun Gupta' 'Farhan Iyer' 'Zoya Singh'
 'Sanjay Verma' 'Alisha Verma' 'Aisha Mehta' 'Amit Singh' 'Prerna Khan'
 'Karan Iyer' 'Mahesh Patel' 'Aisha Reddy' 'Sanjay Nair' 'Amit Das'
 'Anjali Das' 'Ritika Iyer' 'Neha Gupta' 'Divya Iyer' 'Mahesh Gupta'
 'Arjun Yadav' 'Alisha Khan' 'Amit Khan' 'Pooja Yadav' 'Neha Verma'
 'Rohan Agarwal' 'Varun Yadav' 'Rahul Patel' 'Simran Yadav' 'Prerna Singh'
 'Rohan Patel' 'Karan Yadav' 'Kabir Gupta' 'Ritika Singh' 'Karan Khan'
 'Varun Bansal' 'Nisha Chopra' 'Divya Sharma' 'Simran Nair' 'Suresh Nair'
 'Pooja Sharma' 'Sanjay Chopra' 'Vivek Agarwal' 'Arjun Bansal' 'Vivek Das'
 'Karan Sharma' 'Rohan Chopra' 'Sneha Nair' 'Sneha Reddy' 'Divya Verma'
 'Suresh Yadav' 'Prerna Gupta' 'Pooja Nair' 'Karan Reddy' 'Neha Chopra'
 'Aisha Das' 'Suresh Das' 'Nisha Reddy' 'Anjali Bansal' 'Prerna Sharma'
 'Sneha Agarwal' 'Aisha Agarwal' 'Kabir Singh' 'Divya Yadav'
 'Ritika Sharma' 'Varun Iyer' 'Pooja Joshi' 'Rahul Gupta' 'Farhan Sharma'
 'Varun Reddy' 'Suresh Singh' 'Sanjay Khan' 'Rahul Yadav' 'Amit Gupta'
 'Varun Mehta' 'Farhan Singh' 'Rohan Sharma' 'Divya Agarwal' 'Sneha Verma'
 'Sneha Sharma' 'Varun Patel' 'Kabir Sharma' 'Vivek Yadav' 'Arjun Sharma'
 'Karan Patel' 'Rohan Mehta' 'Zoya Yadav' 'Amit Joshi' 'Farhan Bansal'
 'Kabir Patel' 'Rohan Khan' 'Kabir Bansal' 'Alisha Singh' 'Mahesh Chopra'
 'Prerna Nair' 'Arjun Iyer' 'Farhan Reddy' 'Neha Reddy' 'Sneha Khan'
 'Farhan Yadav' 'Vivek Reddy' 'Alisha Gupta' 'Pooja Reddy' 'Nisha Mehta'
 'Amit Bansal' 'Neha Agarwal' 'Rahul Agarwal' 'Nisha Bansal' 'Sneha Das'
 'Neha Mehta' 'Sanjay Patel' 'Divya Khan' 'Suresh Reddy' 'Suresh Gupta'
 'Aisha Bansal' 'Farhan Agarwal' 'Pooja Agarwal' 'Aisha Patel' 'Nisha Das'
 'Simran Agarwal' 'Vivek Iyer' 'Karan Bansal' 'Neha Yadav' 'Rahul Chopra'
 'Suresh Mehta' 'Ritika Agarwal' 'Sanjay Yadav' 'Sneha Patel'
 'Divya Gupta' 'Kabir Agarwal' 'Sneha Mehta' 'Sanjay Iyer' 'Neha Iyer'
 'Zoya Gupta' 'Prerna Joshi' 'Alisha Patel' 'Sanjay Agarwal' 'Varun Khan'
 'Arjun Singh' 'Zoya Patel' 'Vivek Gupta' 'Suresh Bansal' 'Karan Nair'
 'Mahesh Khan' 'Anjali Joshi' 'Varun Nair' 'Karan Verma' 'Neha Singh'
 'Vivek Mehta' 'Vivek Joshi' 'Sneha Chopra' 'Ritika Mehta' 'Neha Joshi'
 'Amit Reddy' 'Pooja Bansal' 'Simran Verma' 'Pooja Mehta' 'Rahul Joshi'
 'Nisha Agarwal' 'Prerna Das' 'Anjali Khan' 'Karan Chopra' 'Farhan Nair'
 'Rohan Iyer' 'Pooja Chopra' 'Rohan Singh' 'Simran Khan' 'Karan Joshi'
 'Sanjay Joshi' 'Simran Sharma' 'Zoya Khan' 'Simran Joshi' 'Prerna Iyer'
 'Divya Das' 'Kabir Iyer' 'Pooja Gupta' 'Pooja Iyer' 'Zoya Reddy'
 'Zoya Nair' 'Ritika Reddy' 'Ritika Gupta' 'Anjali Mehta' 'Pooja Khan'
 'Anjali Iyer' 'Amit Chopra' 'Vivek Nair' 'Sneha Singh' 'Simran Patel'
 'Nisha Verma' 'Simran Mehta' 'Rohan Joshi' 'Rohan Das' 'Zoya Agarwal'
 'Neha Das' 'Arjun Khan' 'Rahul Singh' 'Prerna Verma' 'Nisha Yadav'
 'Pooja Das' 'Prerna Yadav' 'Anjali Gupta' 'Rohan Verma' 'Anjali Singh'
 'Sanjay Mehta' 'Nisha Sharma' 'Simran Iyer' 'Varun Agarwal' 'Kabir Verma'
 'Sneha Yadav' 'Rohan Bansal' 'Sanjay Sharma' 'Anjali Verma' 'Aisha Joshi'
 'Mahesh Agarwal']

Column: Phone Number
[9720639364 9159953102 9624084493 ... 9138604359 9595907287 9076779277]

Column: Gender
['Male' 'Female']

Column: Age
[21 19 24 60 25 55 42 47 35 57 53 40 54 59 50 49 43 28 31 37 27 26 48 23
 44 51 56 52 41 36 63 38 29 32 30 65 61 45 64 20 39 58 62 22 18 46 33 34]

Column: Customer Region
['East' 'Central' 'North' 'South' 'West']

Column: Customer Type
['Returning' 'Loyal' 'New']

Column: Product ID
['PROD-8721' 'PROD-5451' 'PROD-8448' ... 'PROD-6474' 'PROD-9795'
 'PROD-2546']

Column: Product Name
['Herbal Face Wash' 'USB-C Charger' 'Gaming Mouse' 'Slim Fit Jeans'
 'Cotton T-Shirt' 'Bluetooth Speaker' 'Hooded Sweatshirt' 'Casual Kurta'
 'Matte Lipstick' 'Wireless Headphones' 'Formal Shirt' 'Aloe Vera Gel'
 'Smartwatch' 'Skin Repair Serum' 'Hydrating Face Cream']

Column: Brand
['SilkSkin' 'TechPulse' 'CyberCore' 'UrbanWeave' 'StreetLayer' 'VoltEdge'
 'ComfortLine' 'VelvetTouch' 'NovaGear' 'PureBloom' 'EliteWear'
 'GlowEssence']

Column: Product Category
['Beauty' 'Electronics' 'Clothing']

Column: Tags
{'unisex', 'cotton', 'skincare', 'formal', 'portable', 'smart', 'organic', 'casual', 'accessories', 'makeup', 'fashion', 'beauty', 'fragrance-free', 'wireless', 'gadgets'}

Column: Quantity
[5 3 1 4 2]

Column: Price per Unit
[4268 4626  575 ... 2331 1932 1108]

Column: Discount Percentage
[12 28 43 26 44 17 45 30  2 21  9 13 48 50 16 34 31  8 11  0 24  1 20 25
 35 29 22 36  6  4 10 14  5 15 33 46 42 37 49 18 40 38 23 19 27 47 32 39
 41  3  7]

Column: Total Amount
[21340 23130  1725 ... 15925  7869 10122]

Column: Final Amount
[18779.2  16653.6    983.25 ...  1570.12  1210.74  3645.65]

Column: Payment Method
['UPI' 'Credit Card' 'Debit Card' 'Cash' 'Wallet' 'Net Banking']

Column: Order Status
['Cancelled' 'Returned' 'Completed' 'Pending']

Column: Delivery Type
['Standard' 'Express' 'Store Pickup']

Column: Store ID
['ST-015' 'ST-006' 'ST-038' 'ST-048' 'ST-014' 'ST-039' 'ST-016' 'ST-032'
 'ST-035' 'ST-002' 'ST-008' 'ST-042' 'ST-024' 'ST-027' 'ST-044' 'ST-009'
 'ST-028' 'ST-031' 'ST-049' 'ST-041' 'ST-012' 'ST-033' 'ST-003' 'ST-029'
 'ST-019' 'ST-020' 'ST-037' 'ST-001' 'ST-047' 'ST-013' 'ST-017' 'ST-021'
 'ST-010' 'ST-007' 'ST-043' 'ST-036' 'ST-046' 'ST-018' 'ST-005' 'ST-022'
 'ST-045' 'ST-030' 'ST-034' 'ST-004' 'ST-026' 'ST-040' 'ST-050' 'ST-011'
 'ST-025' 'ST-023']

Column: Store Location
['Ahmedabad' 'Chennai' 'Pune' 'Lucknow' 'Mumbai' 'Jaipur' 'Kolkata'
 'Bengaluru' 'Delhi' 'Hyderabad']

Column: Salesperson ID
['EMP-7554' 'EMP-1890' 'EMP-5981' ... 'EMP-2685' 'EMP-6572' 'EMP-5564']

Column: Employee Name
['Harsh Agarwal' 'Ankit Tiwari' 'Khushi Agarwal' 'Ashmi Jain'
 'Ram Chaudhry' 'Deepak Goyal' 'Yash Balyan' 'Kulasekhar Busi']

 """