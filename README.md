# My Virtual Bookshelf API Server

**Author**: Brooke Heck

**Version**: 1.0.0

## Overview
This is a an api used to store users, and the books and notes that they save to their account. MongoDB is used to store all the data and Mongoose is used to connect and query the database. The user can also create customized lists and add saved books to their lists. After the user creates an account, basic auth is used for authentication. With successful sign in, the user receives a token that must send to the server with all other requests. Access control is used for managing users. To get all the users and delete a user, the user must have an admin role.

## Problem Domain
Can store books that you have read, want to read, or find more books to read. There is a list feature so that saved books can be sorted into lists. There is also a notes feature to save notes about the books while you are reading them.

## User Stories
- As a user, I want to sign up for an account and securely login.
- As a user, I want to see books that I have saved, along with notes that I made about each book.
- As a user, I want to be able to sort and search my saved books.
- As a user, I want to edit and remove books that I have saved.
- As a user, I want to search for new books and be able to save them

- As an admin, I want to be able to manage users that sign up for an account on my website
- As an admin, I want to be able to manage user roles

## Deployed Server
[https://virtual-books-bh.herokuapp.com](https://virtual-books-bh.herokuapp.com/)

## Architecture and Routes
<img src='./bookshelfRoutes.png' width='100%' height='auto' />


## Change Log
10-02-2022 08:26pm - version one fully functional, all routes and middleware working