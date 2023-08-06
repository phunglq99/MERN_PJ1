import User from '../models/Users.js';

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.find(id);

        const friends = await Promise.all(
            user.friends.map((id) => {
                return User.findById(id);
            })
        );

        // const formattedFriends = friends.map(
        //     ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        //         return {
        //             _id,
        //             firstName,
        //             lastName,
        //             occupation,
        //             location,
        //             picturePath
        //         };
        //     }
        // );
        res.status(200).json(friends);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
