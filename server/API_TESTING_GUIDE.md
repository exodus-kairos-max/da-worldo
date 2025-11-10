# API Testing Guide - Post Deployment

This guide shows you how to test all API endpoints after deployment to verify your server is working correctly.

## Prerequisites

- API Gateway URL (from deployment output)
- Postman, curl, or any HTTP client
- Sample test data

## Base URL

Replace `YOUR_API_URL` with your actual API Gateway URL:
```
https://xxxxx.execute-api.ap-south-1.amazonaws.com
```

## 1. Health Check

### Test Server is Running
```bash
curl https://YOUR_API_URL/
```

**Expected Response:**
```json
{
  "message": "server chal raha hai"
}
```

**Status Code:** `200 OK`

---

## 2. Product APIs

### 2.1 Get All Products
```bash
curl https://YOUR_API_URL/api/products
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "PK": "PRODUCT#product_id",
      "SK": "METADATA",
      "type": "PRODUCT",
      "id": "product_id",
      "pName": "Product Name",
      "pPrice": 999,
      "pDescription": "Product Description",
      "pSizes": ["S", "M", "L", "XL"],
      "pCategory": "category",
      "pFit": "fit",
      "image": "image_url",
      "stock": {
        "S": 10,
        "M": 10,
        "L": 10,
        "XL": 10
      },
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Status Code:** `200 OK`

**Test in Browser:**
Open: `https://YOUR_API_URL/api/products`

### 2.2 Get Product by ID
```bash
curl https://YOUR_API_URL/api/products/PRODUCT_ID
```

**Replace `PRODUCT_ID`** with an actual product ID from your database.

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "PK": "PRODUCT#product_id",
    "SK": "METADATA",
    "type": "PRODUCT",
    "id": "product_id",
    "pName": "Product Name",
    "pPrice": 999,
    "pDescription": "Product Description",
    "pSizes": ["S", "M", "L", "XL"],
    "pCategory": "category",
    "pFit": "fit",
    "image": "image_url",
    "stock": {
      "S": 10,
      "M": 10,
      "L": 10,
      "XL": 10
    },
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Code:** `200 OK`

**Error Response (Product Not Found):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

**Status Code:** `404 Not Found`

---

## 3. Authentication APIs

### 3.1 Register User
```bash
curl -X POST https://YOUR_API_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "user_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

**Status Code:** `201 Created`

**Error Response (User Already Exists):**
```json
{
  "success": false,
  "error": "User with this email already exists"
}
```

**Status Code:** `409 Conflict`

**Error Response (Validation Error):**
```json
{
  "success": false,
  "error": "Email, name, and password are required"
}
```

**Status Code:** `400 Bad Request`

### 3.2 Login User
```bash
curl -X POST https://YOUR_API_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "user_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

**Status Code:** `200 OK`

**Error Response (Invalid Credentials):**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

**Status Code:** `401 Unauthorized`

### 3.3 Get User Profile
```bash
curl https://YOUR_API_URL/api/auth/profile/USER_ID
```

**Replace `USER_ID`** with an actual user ID.

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "PK": "USER#user_id",
    "SK": "PROFILE",
    "type": "USER_PROFILE",
    "userId": "user_id",
    "name": "Test User",
    "email": "test@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Code:** `200 OK`

### 3.4 Update User Profile
```bash
curl -X PUT https://YOUR_API_URL/api/auth/profile/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "email": "updated@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "PK": "USER#user_id",
    "SK": "PROFILE",
    "type": "USER_PROFILE",
    "userId": "user_id",
    "name": "Updated Name",
    "email": "updated@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Code:** `200 OK`

---

## 4. Address APIs

### 4.1 Create/Update Address
```bash
curl -X POST https://YOUR_API_URL/api/address \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id",
    "fullName": "Test User",
    "phoneNumber": "+919876543210",
    "addressLine1": "123 Test Street",
    "addressLine2": "Near Test Mall",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pinCode": "400001",
    "country": "India",
    "isDefault": true
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Address saved successfully",
  "data": {
    "userId": "user_id",
    "fullName": "Test User",
    "city": "Mumbai",
    "state": "Maharashtra"
  }
}
```

**Status Code:** `201 Created`

### 4.2 Get User Address
```bash
curl https://YOUR_API_URL/api/address/USER_ID
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "PK": "USER#user_id",
    "SK": "ADDRESS",
    "type": "USER_ADDRESS",
    "userId": "user_id",
    "fullName": "Test User",
    "phoneNumber": "+919876543210",
    "addressLine1": "123 Test Street",
    "addressLine2": "Near Test Mall",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pinCode": "400001",
    "country": "India",
    "isDefault": true,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Code:** `200 OK`

---

## 5. Contact API

### 5.1 Send Contact Message
```bash
curl -X POST https://YOUR_API_URL/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "message_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  }
}
```

**Status Code:** `201 Created`

**Error Response (Validation Error):**
```json
{
  "success": false,
  "error": "Name, email, and message are required"
}
```

**Status Code:** `400 Bad Request`

---

## 6. Razorpay APIs

### 6.1 Health Check
```bash
curl https://YOUR_API_URL/api/v2/razorpay/
```

**Expected Response:**
```json
{
  "success": true,
  "message": "API works"
}
```

**Status Code:** `200 OK`

### 6.2 Create Payment Transaction
```bash
curl -X POST https://YOUR_API_URL/api/v2/razorpay/create-transaction \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000
  }'
```

**Expected Response:**
```json
{
  "id": "order_xxxxxxxxxxxxx",
  "entity": "order",
  "amount": 100000,
  "amount_paid": 0,
  "amount_due": 100000,
  "currency": "INR",
  "receipt": "receipt_order1234567890",
  "status": "created",
  "attempts": 0,
  "created_at": 1234567890
}
```

**Status Code:** `200 OK`

**Error Response:**
```json
{
  "success": false,
  "message": "Could not complete payment, internal server error"
}
```

**Status Code:** `500 Internal Server Error`

### 6.3 Verify Payment
```bash
curl -X POST https://YOUR_API_URL/api/v2/razorpay/verify-payment \
  -H "Content-Type: application/json" \
  -d '{
    "razorpay_order_id": "order_xxxxxxxxxxxxx",
    "razorpay_payment_id": "pay_xxxxxxxxxxxxx",
    "razorpay_signature": "signature_xxxxxxxxxxxxx",
    "orderData": {
      "orderId": "ORD_123",
      "userId": "user_id",
      "userEmail": "test@example.com",
      "orderStatus": "PAID",
      "totalAmount": 1000,
      "currency": "INR",
      "shippingAddress": {
        "fullName": "Test User",
        "phoneNumber": "+919876543210",
        "addressLine1": "123 Test Street",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pinCode": "400001",
        "country": "India"
      },
      "items": [
        {
          "productId": "product_id",
          "productName": "Product Name",
          "quantity": 1,
          "pricePerUnit": 1000,
          "selectedSize": "M"
        }
      ]
    }
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Payment verified and order saved successfully",
  "orderId": "ORD_123"
}
```

**Status Code:** `200 OK`

---

## 7. Order APIs

### 7.1 Health Check
```bash
curl https://YOUR_API_URL/api/orders/health/test
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Order routes are working",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Status Code:** `200 OK`

### 7.2 Get Recent Orders
```bash
curl https://YOUR_API_URL/api/orders/recent/all?limit=10
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "orderId": "ORD_123",
      "userId": "user_id",
      "userEmail": "test@example.com",
      "totalAmount": 1000,
      "orderStatus": "PAID",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "PK": "ORDER#ORD_123",
      "GSI1PK": "USER#user_id",
      "GSI1SK": "ORDER#2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 10
}
```

**Status Code:** `200 OK`

### 7.3 Get User Orders
```bash
curl https://YOUR_API_URL/api/orders/user/USER_ID
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "orderId": "ORD_123",
      "userId": "user_id",
      "userEmail": "test@example.com",
      "orderStatus": "PAID",
      "totalAmount": 1000,
      "currency": "INR",
      "shippingAddress": {
        "fullName": "Test User",
        "phoneNumber": "+919876543210",
        "addressLine1": "123 Test Street",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pinCode": "400001",
        "country": "India"
      },
      "razorpayOrderId": "order_xxxxxxxxxxxxx",
      "razorpayPaymentId": "pay_xxxxxxxxxxxxx",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "items": [
        {
          "productId": "product_id",
          "productName": "Product Name",
          "productDescription": "Product Description",
          "quantity": 1,
          "pricePerUnit": 1000,
          "totalPrice": 1000,
          "selectedSize": "M",
          "image": "image_url"
        }
      ]
    }
  ]
}
```

**Status Code:** `200 OK`

### 7.4 Get Order by ID
```bash
curl https://YOUR_API_URL/api/orders/ORDER_ID
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "ORD_123",
    "userId": "user_id",
    "userEmail": "test@example.com",
    "orderStatus": "PAID",
    "totalAmount": 1000,
    "currency": "INR",
    "shippingAddress": {
      "fullName": "Test User",
      "phoneNumber": "+919876543210",
      "addressLine1": "123 Test Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pinCode": "400001",
      "country": "India"
    },
    "razorpayOrderId": "order_xxxxxxxxxxxxx",
    "razorpayPaymentId": "pay_xxxxxxxxxxxxx",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "items": [
      {
        "productId": "product_id",
        "productName": "Product Name",
        "productDescription": "Product Description",
        "quantity": 1,
        "pricePerUnit": 1000,
        "totalPrice": 1000,
        "selectedSize": "M",
        "image": "image_url"
      }
    ]
  }
}
```

**Status Code:** `200 OK`

**Error Response (Order Not Found):**
```json
{
  "success": false,
  "error": "Order not found"
}
```

**Status Code:** `404 Not Found`

### 7.5 Test Order Save (Debug Endpoint)
```bash
curl -X POST https://YOUR_API_URL/api/orders/test-save \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD_TEST_123",
    "userId": "user_id",
    "userEmail": "test@example.com",
    "orderStatus": "PAID",
    "totalAmount": 1000,
    "currency": "INR",
    "shippingAddress": {
      "fullName": "Test User",
      "phoneNumber": "+919876543210",
      "addressLine1": "123 Test Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pinCode": "400001",
      "country": "India"
    },
    "items": [
      {
        "productId": "product_id",
        "productName": "Product Name",
        "quantity": 1,
        "pricePerUnit": 1000,
        "selectedSize": "M"
      }
    ]
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Order saved successfully to DynamoDB",
  "orderId": "ORD_TEST_123",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Status Code:** `200 OK`

---

## Testing with Postman

### Import Collection

1. Open Postman
2. Create a new collection: "Falsenine API"
3. Set collection variable: `baseUrl` = `https://YOUR_API_URL`
4. Create requests for each endpoint above
5. Use `{{baseUrl}}` in request URLs

### Example Postman Request

**Request Name:** Get All Products
- **Method:** GET
- **URL:** `{{baseUrl}}/api/products`
- **Headers:** None required

**Request Name:** Register User
- **Method:** POST
- **URL:** `{{baseUrl}}/api/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body:** (raw JSON)
```json
{
  "email": "test@example.com",
  "name": "Test User",
  "password": "password123"
}
```

---

## Testing with Browser

### Testable Endpoints (GET requests)

1. **Health Check:**
   ```
   https://YOUR_API_URL/
   ```

2. **Get All Products:**
   ```
   https://YOUR_API_URL/api/products
   ```

3. **Get Product by ID:**
   ```
   https://YOUR_API_URL/api/products/PRODUCT_ID
   ```

4. **Get User Profile:**
   ```
   https://YOUR_API_URL/api/auth/profile/USER_ID
   ```

5. **Get User Address:**
   ```
   https://YOUR_API_URL/api/address/USER_ID
   ```

6. **Get User Orders:**
   ```
   https://YOUR_API_URL/api/orders/user/USER_ID
   ```

7. **Get Order by ID:**
   ```
   https://YOUR_API_URL/api/orders/ORDER_ID
   ```

8. **Get Recent Orders:**
   ```
   https://YOUR_API_URL/api/orders/recent/all
   ```

9. **Razorpay Health Check:**
   ```
   https://YOUR_API_URL/api/v2/razorpay/
   ```

10. **Order Health Check:**
    ```
    https://YOUR_API_URL/api/orders/health/test
    ```

---

## Common Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "error": "Resource already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error message"
}
```

---

## Monitoring & Debugging

### Check CloudWatch Logs

```bash
aws logs tail /aws/lambda/falsenine-server-prod-api --follow
```

### Check API Gateway Logs

1. Go to AWS Console → API Gateway
2. Select your API
3. Go to "Logs" section
4. View CloudWatch Logs

### Common Issues

1. **CORS Errors:**
   - Verify CORS configuration in `serverless.yml`
   - Check allowed origins include your frontend domain

2. **DynamoDB Errors:**
   - Verify table names are correct
   - Check IAM permissions
   - Verify table structure matches code expectations

3. **Razorpay Errors:**
   - Verify Razorpay credentials are set correctly
   - Check environment variables in Lambda

4. **Timeout Errors:**
   - Increase Lambda timeout in `serverless.yml`
   - Check DynamoDB query performance

---

## Quick Test Script

Create a file `test-api.sh`:

```bash
#!/bin/bash

API_URL="https://YOUR_API_URL"

echo "Testing Health Check..."
curl -s "$API_URL/" | jq .

echo -e "\nTesting Products..."
curl -s "$API_URL/api/products" | jq '.data | length'

echo -e "\nTesting Razorpay Health..."
curl -s "$API_URL/api/v2/razorpay/" | jq .

echo -e "\nTesting Order Health..."
curl -s "$API_URL/api/orders/health/test" | jq .

echo -e "\nAll tests completed!"
```

Run: `chmod +x test-api.sh && ./test-api.sh`

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Health check endpoint works (`GET /`)
- [ ] Products API returns data (`GET /api/products`)
- [ ] User registration works (`POST /api/auth/register`)
- [ ] User login works (`POST /api/auth/login`)
- [ ] Address creation works (`POST /api/address`)
- [ ] Contact form works (`POST /api/contact`)
- [ ] Razorpay payment creation works (`POST /api/v2/razorpay/create-transaction`)
- [ ] Order retrieval works (`GET /api/orders/user/:userId`)
- [ ] CORS is working (test from browser)
- [ ] CloudWatch logs show no errors
- [ ] All environment variables are set correctly

---

## 🎉 Success Criteria

Your server is working correctly if:
1. All health check endpoints return `200 OK`
2. Products API returns product data
3. User registration and login work
4. Orders can be created and retrieved
5. No errors in CloudWatch logs
6. Frontend can successfully connect to API

---

**Need Help?** Check CloudWatch Logs for detailed error messages.

