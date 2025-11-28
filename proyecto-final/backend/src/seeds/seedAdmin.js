import { sequelize } from "../models/index.js";
import {
  Profile,
  Permission,
  ProfilePermission,
  UserProfile,
  User,
} from "../models/index.js";

const seedAdmin = async () => {
  try {
    // 1. Creación rol 'admin'
    const [adminProfile] = await Profile.findOrCreate({
      where: { profileName: "admin" },
    });

    // 2. Creación permisos
    const permissionNames = [
      "can_delete_users",
      "can_edit_events",
      "can_manage_tags",
      "can_view_all_users",
    ];

    const permissions = await Promise.all(
      permissionNames.map((name) =>
        Permission.findOrCreate({ where: { permissionName: name } })
      )
    );

    // 3. Asignación los permisos al rol 'admin'
    for (const [permission] of permissions) {
      await ProfilePermission.findOrCreate({
        where: {
          idProfile: adminProfile.idProfile,
          idPermission: permission.idPermission,
        },
      });
    }

    // 4. Asignar el rol de 'administrador' al usuario con ID = 1 --+
    const user = await User.findByPk(1); //<------------------------+
    if (!user) {
      console.warn("Usuario con ID = 1 no encontrado");
      return;
    }

    await UserProfile.findOrCreate({
      where: {
        idUser: user.idUser,
        idProfile: adminProfile.idProfile,
      },
    });

    console.log(
      "El rol y los permisos de administrador están asignados al usuario con ID = 1."
    );
  } catch (err) {
    console.error("Error seeding:", err.message);
  } finally {
    await sequelize.close();
  }
};

seedAdmin();
