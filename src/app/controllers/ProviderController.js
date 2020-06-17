import { File } from '../models/File';
import { User } from '../models/User';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      attributes: ['avatar_id', 'email', 'id', 'name'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] }
      ],
      where: { provider: true }
    });

    return res.json(providers);
  }
}

export default new ProviderController();
