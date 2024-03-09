import { csvToJson } from "../utils/utility.js";
import { User } from "../models/postgres.model.js";

//At first the path is being taken down. The file is being read and then the data is being converted to the JSON format and then the data is being stored in the database.
export const uploadCSVFile = async (req, res) => {
    try {
        let { path } = req.file
        //File is convered to the JSON and kept right in the same folder, if needed to be downloaded and then we map down everything to the desired required format and then we store it in the database.
        let response = (csvToJson(path)).map(x => {
            return {
                name: x.name.firstName + " " + x.name.lastName,
                age: x.age,
                address: x.address,
                additionalInfo: { gender: x.gender }
            }
        })
        // we use the bulkCreate to upload multiple records at once
        await User.bulkCreate(response);
        return res.json({ message: 'File uploaded successfully' })
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};
