/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - password
 *         - email
 *         - roles
 *         - jobTitle
 *         - birthDate
 *       properties:
 *         name:
 *           type: string
 *         surname:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: email
 *         roles:
 *           type: array
 *         jobTitle:
 *           type: string
 *         birthDate:
 *           type: Date
 *     Illness:
 *       type: object
 *       required:
 *         - name
 *         - severity
 *       properties:
 *         name:
 *           type: string
 *         severity:
 *           type: number
 *     Diaries:
 *       type: object
 *       required:
 *       properties:
 *         note:
 *           type: string
 *     Moods:
 *       type: object
 *       required:
 *         - stress
 *         - anxiety
 *         - depression
 *         - general
 *         - happiness
 *       properties:
 *         stress:
 *           type: number
 *         anxiety:
 *           type: number
 *         depression:
 *           type: number
 *         happiness:
 *           type: number
 *         general:
 *           type: number
 *     Bodies:
 *       type: object
 *       required:
 *         - weight
 *         - height
 *         - sex
 *       properties:
 *         weight:
 *           type: number
 *         height:
 *           type: number
 *         sex:
 *           type: number
 *     Company:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *     PatientIllness:
 *       type: object
 *       required:
 *         - illnessId
 *       properties:
 *         illnessId:
 *           type: string
 *         date:
 *          type: Date
*     PatientCompany:
 *       type: object
 *       required:
 *         - companyId
 *       properties:
 *         companyId:
 *           type: string
 *         startDate:
 *          type: Date
 *     PatientLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: email
 *         password:
 *           type: string
 *     HealthParams:
 *       type: object
 *       required:
 *         - hr
 *         - temp
 *       properties:
 *         hr:
 *           type: number
 *         temp:
 *           type: number
 */

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: The patients managing API
 *   name: Diaries
 *   description: The diaries managing API
 *   name: Illness
 *   description: The illness managing API
 *   name: Moods
 *   description: The moods test managing API
 *   name: Bodies
 *   description: The body parameters
 *   name: Patient-Illness
 *   description: Patient illnesses
 *   name: Company
 *   description: The company managing API
 *   name: Patient-Company
 *   description: Patient-Company
 *   name: Results
 *   description: Calculated results
 *   name: HealthParams
 *   description: health status
 */


/**
 * @swagger
 * /api/patient:
 *   get:
 *     summary: Returns the list of all the patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: The list of the patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */

/**
 * @swagger
 * /api/diaries:
 *   get:
 *     summary: Returns the list of all the patient diaries
 *     tags: [Diaries]
 *     responses:
 *       200:
 *         description: The list of the diaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Diaries'
 */

/**
 * @swagger
 * /api/diaries/last:
 *   get:
 *     summary: Returns the last diaries
 *     tags: [Diaries]
 *     responses:
 *       200:
 *         description: The last diaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Diaries'
 */

/**
 * @swagger
 * /api/illness:
 *   get:
 *     summary: Returns the list of all the illness
 *     tags: [Illness]
 *     responses:
 *       200:
 *         description: The list of the illness
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Illness'
 */

/**
 * @swagger
 * /api/bodies:
 *   get:
 *     summary: Returns the list of all the patient parameters
 *     tags: [Bodies]
 *     responses:
 *       200:
 *         description: The list of the patient parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bodies'
 */

/**
 * @swagger
 * /api/patient-illness:
 *   get:
 *     summary: Returns the list of all the patient's illnesses
 *     tags: [Patient-Illness]
 *     responses:
 *       200:
 *         description: The list of the patient's illnesses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Illness'
 */

/**
 * @swagger
 * /api/bodies/last:
 *   get:
 *     summary: Returns the last body parameter
 *     tags: [Bodies]
 *     responses:
 *       200:
 *         description: The last parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bodies'
 */

/**
 * @swagger
 * /api/patient/{id}:
 *   get:
 *     summary: Get the patient by id
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient id
 *     responses:
 *       200:
 *         description: The patient description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: The patient was not found
 */

/**
 * @swagger
 * /api/illness/{id}:
 *   get:
 *     summary: Get the illness by id
 *     tags: [Illness]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The illness id
 *     responses:
 *       200:
 *         description: The illness description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Illness'
 *       404:
 *         description: The illness was not found
 */


/**
 * @swagger
 * /api/patient:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: The patient was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/patient/login:
 *   post:
 *     summary: Login
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientLogin'
 *     responses:
 *       200:
 *         description: The patient  successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientLogin'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/diaries:
 *   post:
 *     summary: Create a new diaries
 *     tags: [Diaries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Diaries'
 *     responses:
 *       200:
 *         description: The diaries was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Diaries'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/illness:
 *   post:
 *     summary: Create a new illness
 *     tags: [Illness]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Illness'
 *     responses:
 *       200:
 *         description: The illness was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Illness'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/moods/{id}:
 *   post:
 *     summary: Create a new mood entry
 *     tags: [Moods]
 *     parameters:
 *      - in: path
 *        name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Moods'
 *     responses:
 *       200:
 *         description: The test was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Moods'
 *       500:
 *         description: Some server error
 */
/
/**
 * @swagger
 * /api/bodies:
 *   post:
 *     summary: Create a new patient body parameters
 *     tags: [Bodies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bodies'
 *     responses:
 *       200:
 *         description: The patient parameters was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bodies'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/patient-illness:
 *   post:
 *     summary: Create a new patient's illness
 *     tags: [Patient-Illness]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientIllness'
 *     responses:
 *       200:
 *         description: The patient illness was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientIllness'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/patient/{id}:
 *  put:
 *    summary: Update the patient by the id
 *    tags: [Patients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The patient id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Patient'
 *    responses:
 *      200:
 *        description: The patient was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Patient'
 *      404:
 *        description: The patient was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /api/illness/{id}:
 *  put:
 *    summary: Update the illness by the id
 *    tags: [Illness]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The illness id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Illness'
 *    responses:
 *      200:
 *        description: The illness was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Illness'
 *      404:
 *        description: The illness was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /api/patient/{id}:
 *   delete:
 *     summary: Remove the patient by id
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient id
 *
 *     responses:
 *       200:
 *         description: The patient was deleted
 *       404:
 *         description: The patient was not found
 */

/**
 * @swagger
 * /api/diaries/{id}:
 *   delete:
 *     summary: Remove the diary
 *     tags: [Diaries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The diaries id
 *
 *     responses:
 *       200:
 *         description: The diary was deleted
 *       404:
 *         description: The diary was not found
 */

/**
 * @swagger
 * /api/illness/{id}:
 *   delete:
 *     summary: Remove the illness by id
 *     tags: [Illness]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The illness id
 *
 *     responses:
 *       200:
 *         description: The illness was deleted
 *       404:
 *         description: The illness was not found
 */

/**
 * @swagger
 * /api/bodies/{id}:
 *   delete:
 *     summary: Remove the patient body parameters by id
 *     tags: [Bodies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The parameters id
 *
 *     responses:
 *       200:
 *         description: The patient parameters were deleted
 *       404:
 *         description: The patient was not found
 */

/**
 * @swagger
 * /api/patient-illness/{id}:
 *   delete:
 *     summary: Remove the patient illness by id
 *     tags: [Patient-Illness]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient illness id
 *
 *     responses:
 *       200:
 *         description: The patient illness was deleted
 *       404:
 *         description: The patient illness was not found
 */
/**
 * @swagger
 * /api/patient/me:
 *   get:
 *     summary: Check the patient with token
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: The patient description
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: The patient was not found
 */
/**
 * @swagger
 * /api/results:
 *   get:
 *     summary: Returns the results of calculation
 *     tags: [Results]
 *     responses:
 *       200:
 *         description: The results
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /api/patient-company/{id}:
 *   delete:
 *     summary: Remove the patient company by id
 *     tags: [Patient-Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient company id
 *
 *     responses:
 *       200:
 *         description: The patient company was deleted
 *       404:
 *         description: The patient company was not found
 */


/**
 *
 * @swagger
 * /api/patient-company:
 *   get:
 *     summary: Returns the list of all the patient's company
 *     tags: [Patient-Company]
 *     responses:
 *       200:
 *         description: The list of the patient's company
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
/**
 * @swagger
 * /api/patient-company:
 *   post:
 *     summary: Create a new patient's company
 *     tags: [Patient-Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientCompany'
 *     responses:
 *       200:
 *         description: The patient company was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientCompany'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /api/company:
 *   get:
 *     summary: Returns the list of all the company
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: The list of the company
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */

/**
 * @swagger
 * /api/company/{id}:
 *   get:
 *     summary: Get the company by id
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The company id
 *     responses:
 *       200:
 *         description: The company description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: The company was not found
 */

/**
 * @swagger
 * /api/company:
 *   post:
 *     summary: Create a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: The company was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /api/company/{id}:
 *  put:
 *    summary: Update the company by the id
 *    tags: [Company]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The company id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Company'
 *    responses:
 *      200:
 *        description: The company was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Company'
 *      404:
 *        description: The company was not found
 *      500:
 *        description: Some error happened
 */
/**
 * @swagger
 * /api/company/{id}:
 *   delete:
 *     summary: Remove the company by id
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The company id
 *
 *     responses:
 *       200:
 *         description: The company was deleted
 *       404:
 *         description: The company was not found
 */


/**
 * @swagger
 * /api/healthParams:
 *   get:
 *     summary: Returns the list of all the patient parameters
 *     tags: [Bodies]
 *     responses:
 *       200:
 *         description: The list of the patient parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bodies'
 */

/**
 * @swagger
 * /api/healthParams/last:
 *   get:
 *     summary: Returns the last healthParams
 *     tags: [HealthParams]
 *     responses:
 *       200:
 *         description: The last healthParams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HealthParams'
 */

/**
 * @swagger
 * /api/healthParams:
 *   post:
 *     summary: Create a new patient healthParams
 *     tags: [HealthParams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthParams'
 *     responses:
 *       200:
 *         description: The patient healthParams was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthParams'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/healthParams/{id}:
 *   delete:
 *     summary: Remove the patient healthParams by id
 *     tags: [HealthParams]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The healthParams id
 *
 *     responses:
 *       200:
 *         description: The patient healthParams were deleted
 *       404:
 *         description: The patient was not found
 */