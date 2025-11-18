import { sequelize } from "../models/index.js";
import {
  Profile,
  Permission,
  ProfilePermission,
  UserProfile,
  User,
} from "../models/index.js";

const seedModerator = async () => {
  try {
    // 1. Creación del rol de 'moderador'
    const [moderatorProfile] = await Profile.findOrCreate({
      where: { profileName: "moderator" },
    });

    // 2. Creación el permiso 'can_edit_events'
    const [perm] = await Permission.findOrCreate({
      where: { permissionName: "can_edit_events" },
    });

    // 3. Asignar permisos al rol de 'moderador'
    await ProfilePermission.findOrCreate({
      where: {
        idProfile: moderatorProfile.idProfile,
        idPermission: perm.idPermission,
      },
    });

    // 4. Asignar el rol de 'moderador' al usuario con ID = 2.-----+
    const user = await User.findByPk(2); //<-----------------------+
    if (!user) {
      console.warn("❌ Usuario con ID = 2 no encontrado");
      return;
    }

    await UserProfile.findOrCreate({
      where: {
        idUser: user.idUser,
        idProfile: moderatorProfile.idProfile,
      },
    });

    console.log(
      "✅ Роль El rol y los permisos de moderador se asignan al usuario con ID = 2."
    );
  } catch (err) {
    console.error("❌ Error seeding:", err.message);
  } finally {
    await sequelize.close();
  }
};

seedModerator();
