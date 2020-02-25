import Agent from 'models/agent';

/**
   * @swagger
   * GET /v1/agents:id:
   *   get:
   *     description: Get a specific agent
   *     tags: [Agents]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: 'controllers/v1/agent/get.action.js'
   *         name: ID
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
   *         description: UUID of the agent to retrieve
   *     responses:
   *       200:
   *         description: JSON representation of the agent
   *         schema:
   *           type: object
   *           properties:
   *             message:
   *               type: string
   */
exports.get = async (req, res) => {
   try {
      const data = { ...req.body, ...req.params };

      const agent = await Agent.findById(data.agent);

      // const streamToken = client.createToken(agent._id.toString());

      // // jwt token generation (for api)
      // const apiToken = jwt.sign(
      //    {
      //       sub: agent._id,
      //       role: agent.role
      //    },
      //    process.env.AUTH_SECRET
      // );

      res.status(200).json(agent);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
   }
};
