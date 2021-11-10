# 1. Kloud API Documentation

- [1. Kloud API Documentation](#1-kloud-api-documentation)
- [2. Return convention](#2-return-convention)
  - [2.1. If the request is successful](#21-if-the-request-is-successful)
  - [2.2. If the request failed](#22-if-the-request-failed)
- [3. Users](#3-users)
  - [3.1. Register account](#31-register-account)
  - [3.2. Sign in account](#32-sign-in-account)
  - [3.3. Delete account](#33-delete-account)
  - [3.4. Get account](#34-get-account)
  - [3.5. Edit account](#35-edit-account)
- [4. Photos](#4-photos)
  - [4.1. Upload](#41-upload)
  - [4.2. Read a photo](#42-read-a-photo)
  - [4.3. Read all photos](#43-read-all-photos)
  - [4.4. Get all photos from an album](#44-get-all-photos-from-an-album)
  - [4.5. Delete photo](#45-delete-photo)
  - [4.6. Add to favorite](#46-add-to-favorite)
  - [4.7. Remove from favorite](#47-remove-from-favorite)
  - [4.8. Update photo description](#48-update-photo-description)
- [5. Albums](#5-albums)
  - [5.1. Create album](#51-create-album)
  - [5.2. Delete album](#52-delete-album)
  - [5.3. Update album name](#53-update-album-name)

<br/>

# 2. Return convention
<br/>

## 2.1. If the request is successful
```json
{
    "status": "SUCCESS",
    "message": "x",
    "data": ?
}
```
<br/>

## 2.2. If the request failed
```json
{
    "status": "FAILED",
    "message": "x",
    "data": ?
}
```
<br/>

# 3. Users
<br/>

## 3.1. Register account

```http
POST /api/user/signup
```
Body:
```js
{
    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String,
}
```
Example
```json
{
    "firstName": "Michel",
    "lastName": "Dupond",
    "email": "michel.dupond@test.fr",
    "password": "Michel@test1"
}
```
Return:
```json
{
  "status": "SUCCESS",
  "message": "Signup successful",
  "data": {
    "_id": "616c0efe77026272b24cd5ea",
    "firstName": "Michel",
    "lastName": "Dupond",
    "email": "michel.dupond@test.fr",
    "password": "$2b$10$ovURIk6Xc.IGcfLyAZkL2.VFZE3vzhD0V4YUC233suuCNFam0.fjq",
    "photoToken": "26a4e7ea-e2f8-4b37-93c5-fefe4fbee63f",
    "__v": 0
  }
}
```
<br/>

## 3.2. Sign in account   

```http
POST /api/user/signin
```
Body:
```js
{
    "email": String,
    "password": String,
}
```
Example
```json
{
    "email": "michel.dupond@test.fr",
    "password": "Michel@test1"
}
```
Return:
```json
{
  "status": "SUCCESS",
  "message": "Sign in successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVmZTc3MDI2MjcyYjI0Y2Q1ZWEiLCJpYXQiOjE2MzQ0NzE4NTd9.SRX7UOWxVyFG4IFyqvW9NXIp3nEgFAw-AEeqb94wHT0",
  "data": [
    {
      "_id": "616c0efe77026272b24cd5ea",
      "firstName": "Michel",
      "lastName": "Dupond",
      "email": "michel.dupond@test.fr",
      "password": "$2b$10$ovURIk6Xc.IGcfLyAZkL2.VFZE3vzhD0V4YUC233suuCNFam0.fjq",
      "photoToken": "26a4e7ea-e2f8-4b37-93c5-fefe4fbee63f",
      "__v": 0
    }
  ]
}
```
<br/>

## 3.3. Delete account

```http
DELETE /api/user/
```
Header:
```js
{
    "auth-token": String
}
```
Example: 
```json
{
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVmZTc3MDI2MjcyYjI0Y2Q1ZWEiLCJpYXQiOjE2MzQ0NzE4NTd9.SRX7UOWxVyFG4IFyqvW9NXIp3nEgFAw-AEeqb94wHT0"
}
```
Return:
```json
{
  "status": "SUCCESS",
  "message": "User successfully deleted."
}
```
<br/>

## 3.4. Get account

```http
GET /api/user/
```
Header:
```js
{
    "auth-token": String
}
```
Example: 
```json
{
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVmZTc3MDI2MjcyYjI0Y2Q1ZWEiLCJpYXQiOjE2MzQ0NzE4NTd9.SRX7UOWxVyFG4IFyqvW9NXIp3nEgFAw-AEeqb94wHT0"
}
```
Return:
```json
{
  "status": "SUCCESS",
  "message": "User successfully found",
  "data": {
    "firstName": "Jean",
    "lastName": "Test",
    "email": "123@a.fr",
    "photoToken": "2d45a82b-36e8-4bcc-8322-44ce6346c412"
  }
}
```
## 3.5. Edit account

```http
PATCH /api/user/
```
Header:
```js
{
    "auth-token": String
}
```
Body:
```js
{
    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String
}
```
Example: 
```json
{
    "firstName": "JeanM",
    "lastName": "Test ",
    "email": "123@abracadabra.fr",
    "password": "Test123@"
}
```
Return:
```json
{
  "status": "SUCCESS",
  "message": "User successfully updated"
}
```
<br/>

# 4. Photos
<br/>

## 4.1. Upload
```http
POST /api/photos/upload
```
Header:
```js
{
    "auth-token": String
}
```
Body:
```js
{
    "file": File,
    "description": String
}
```
Example: 
```json
{
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVmZTc3MDI2MjcyYjI0Y2Q1ZWEiLCJpYXQiOjE2MzQ0NzE4NTd9.SRX7UOWxVyFG4IFyqvW9NXIp3nEgFAw-AEeqb94wHT0"
}
```
Return:
```json
{
  "status": "SUCCESS",
  "message": "Upload successful",
  "data": {
    "albums": [],
    "_id": "616c80ece2ed3a1f51459fb9",
    "favorite": false,
    "date": "2021-10-17T20:00:44.000Z",
    "description": "this is the first test with 1kb file",
    "userId": "616c80b9e2ed3a1f51459fb6",
    "fileName": "58f094e0-763b-4c17-8bbf-19d0355b3161-Clocktower_Panorama_20080622_20mb.jpg",
    "photoId": "616c80e9e2c267fe52006b76",
    "__v": 0
  }
}
```
<br />

## 4.2. Read a photo
```http
GET /api/photos/id/:id
```
Header:
```js
{
    "auth-token": String
}
```
Example: 
```json
{
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVmZTc3MDI2MjcyYjI0Y2Q1ZWEiLCJpYXQiOjE2MzQ0NzE4NTd9.SRX7UOWxVyFG4IFyqvW9NXIp3nEgFAw-AEeqb94wHT0"
}
```
Return:   
The photo.
<br />

## 4.3. Read all photos
```http
GET /api/photos/all/?start=x&limit=y
```
Header:
```js
{
    "auth-token": String
}
```
Example: 
```json
{
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVmZTc3MDI2MjcyYjI0Y2Q1ZWEiLCJpYXQiOjE2MzQ0NzE4NTd9.SRX7UOWxVyFG4IFyqvW9NXIp3nEgFAw-AEeqb94wHT0"
}
```
Return:   
```json
{
  "status": "SUCCESS",
  "data": [
    "616c80e9e2c267fe52006b76"
  ]
}
```
<br />

## 4.4. Get all photos from an album
```http
GET /api/photos/alb/:id/?start=x&limit=y
```
Header:
```js
{
    "auth-token": String
}
```
Example: 
```json
{
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVmZTc3MDI2MjcyYjI0Y2Q1ZWEiLCJpYXQiOjE2MzQ0NzE4NTd9.SRX7UOWxVyFG4IFyqvW9NXIp3nEgFAw-AEeqb94wHT0"
}
```
Return:   
```json
{
  "status": "SUCCESS",
  "data": [
    "616c80e9e2c267fe52006b76"
  ]
}
```
<br />

## 4.5. Delete photo
```http
DELETE /api/photos/id/:id
```
Header:
```js
{
    "auth-token": String
}
```
Example: 
```json
{
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVmZTc3MDI2MjcyYjI0Y2Q1ZWEiLCJpYXQiOjE2MzQ0NzE4NTd9.SRX7UOWxVyFG4IFyqvW9NXIp3nEgFAw-AEeqb94wHT0"
}
```
Return:   
```json
{
  "status": "SUCCESS",
  "message": "File successfully deleted."
}
```
<br />

## 4.6. Add to favorite
```http
PATCH /api/photos/fav/add
```
Header:
```js
{
    "auth-token": String
}
```
Body:
```js
{
    "photoId": String
}
```
Example: 
```json
{
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVmZTc3MDI2MjcyYjI0Y2Q1ZWEiLCJpYXQiOjE2MzQ0NzE4NTd9.SRX7UOWxVyFG4IFyqvW9NXIp3nEgFAw-AEeqb94wHT0"
}
```
Return:   
```json
{
  "status": "SUCCESS",
  "message": "Photo successfully added to favorite"
}
```
<br />

## 4.7. Remove from favorite
```http
PATCH /api/photos/fav/remove
```
Header:
```js
{
    "auth-token": String
}
```
Body:
```js
{
    "photoId": String
}
```
Example: 
```json
{
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGVmZTc3MDI2MjcyYjI0Y2Q1ZWEiLCJpYXQiOjE2MzQ0NzE4NTd9.SRX7UOWxVyFG4IFyqvW9NXIp3nEgFAw-AEeqb94wHT0"
}
```
Return:   
```json
{
  "status": "SUCCESS",
  "message": "Photo successfully removed to favorite"
}
```
<br />

## 4.8. Update photo description
```http
PATCH /api/photos/desc
```
Header:
```js
{
    "auth-token": String
}
```
Body:
```js
{
    "photoId": String,
    "description": String,
}
```
Example: 
```json
{
    "photoId": "616c86e523ecfb23fb4f5fb6",
    "description": "New description"
}
```
Return:   
```json
{
  "status": "SUCCESS",
  "message": "Description successfully changed"
}
```
<br />

# 5. Albums
<br />

## 5.1. Create album
```http
POST /api/album/
```
Header:
```js
{
    "auth-token": String
}
```
Body:
```js
{
    "name": String
}
```
Example: 
```json
{
    "name": "New album"
}
```
Return:   
```json
{
  "status": "SUCCESS",
  "message": "Album created successfully",
  "data": {
    "_id": "616d8b6f7d85864ac2c36faf",
    "userId": "616c80b9e2ed3a1f51459fb6",
    "name": "New album",
    "date": "2021-10-18T14:57:51.000Z",
    "__v": 0
  }
}
```
<br />

## 5.2. Delete album
```http
DELETE /api/album/id/:id
```
Header:
```js
{
    "auth-token": String
}
```
Return:   
```json
{
  "status": "SUCCESS",
  "message": "Album successfully deleted"
}
```
<br />

## 5.3. Update album name
```http
PATCH /api/album/desc
```
Header:
```js
{
    "auth-token": String
}
```
Body:
```js
{
    "name": String
}
```
Example: 
```json
{
    "albumId": "616d8b6f7d85864ac2c36faf",
    "name": "test"
}
```
Return:   
```json
{
  "status": "SUCCESS",
  "message": "Album name successfully changed",
  "data": {
    "_id": "6164b53723e5d7284b214a50",
    "userId": "616c80b9e2ed3a1f51459fb6",
    "name": "test",
    "date": "2021-10-11T22:05:43.000Z",
    "__v": 0
  }
}
```
