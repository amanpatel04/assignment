**Object**
**User** `Object for storing student`
|  key    |   type   |   unique   |
|---------|----------|------------|
|firstName| String   | false      |
|lastName | String   | false      |
|email    | String   | false      |
|phoneNumber|String  | false      |
|handle   | String   | true       |
|maxRating| Number   | false      |
|rating   | Number   | false      |
|timestamps| iso string | false   |

**Problem**
|  key    |   type   |   unique   |
|---------|----------|------------|
|contestId| String   | false      |
|name     | String   | false      |
|rating   | Number   | false      |
|tags     |Array     | false      |
|type     | String   | true       |
|submitTime| Number  | false      |
|handle   | String   | false      |
|timestamps| iso string | false   |

**Contest**
|  key    |   type   |   unique   |
|---------|----------|------------|
|contestId| String   | false      |
|contestName| String | false      |
|handle   | String   | false      |
|newRating| Number   | false      |
|oldRating| Number   | true       |
|rank     | Number  | false       |
|ratingUpdateTimeSeconds| Number| false|
|timestamps| iso string | false   |

<h2 align="center"> User Endpoint </h2>

### GET `/api/user/all`

**Description:** To get all the user list for student table.

**Return:** Array of user object

---

### GET `/api/user/handle?=<handle>`

**Description:** To check wheather student already in database or valid handle or not

**Return:** boolean value with message

---

### GET `/api/user/add?handle=<handle>`

**Description:** Add student and sync with contests and problems

**Return:** Success ro Failure value

---

### PUT `/api/user/update/<id>`

**Description:** accept student updated value in body and update in database according to it

**Return:** boolean value with message

---

### DELETE `/api/user/delete/<id>`

**Description:** Delete student from database and sync with contests and problems

**Return:** boolean value with message

---

### GET `/api/user/<id>`

**Description:** find a student with ID in params

**Return:** Return a user object

<h2 align="center"> Contest Endpoint </h2>

### GET `/api/contest/list?handle=<handle>&day=<day>`

**Description:** find contest having filter participated in contest day ago

**Return:** return array of Contest object

<h2 align="center"> Problem Endpoint </h2> 

### GET `/api/problem/list?handle=<handle>&day=<day>`

**Description:** find problem having filter submitted day ago

**Return:** return array of Problem object
