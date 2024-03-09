import fs from 'fs';

export const csvToJson = (csvFilePath) => {
    try {
        const jsonArray = [];
        const lines = fs.readFileSync(csvFilePath, 'utf-8').split(/\r?\n/);
        if (lines.length < 2) {
            console.error('CSV file does not contain data.');
            return;
        }
        const keys = lines[0].split(',').map(key => key.trim());
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const obj = {};
            values.forEach((value, idx) => {
                const [mainKey, subKey] = keys[idx].split('.');
                if (subKey) {
                    if (!obj[mainKey]) obj[mainKey] = {};
                    obj[mainKey][subKey] = value.trim();
                } else {
                    obj[mainKey] = value.trim();
                }
            });
            jsonArray.push(obj);
        }
        const jsonFileName = csvFilePath.replace('.csv', '.json');
        fs.writeFileSync(jsonFileName, JSON.stringify(jsonArray, null, 4));
        return jsonArray;
    } catch (error) {
        console.log(error);
    }
};
