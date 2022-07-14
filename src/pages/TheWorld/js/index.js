let theWorld = null;

const openfile_input = $(".tw-openfile-input");
const reader_area = $(".tw-reader-area");
drop(reader_area, handleFiles);
openfile_input.addEventListener("change", function(){
    handleFiles(this.files);
});

let saveChanges = function () {
    dataInputToTheWorld();
    const jsonData = JSON.stringify(theWorld.data);
    const enData = LZString.compressToBase64(jsonData);
    fileDownload(enData, theWorld.name);
}

let saveChangesToJson = function () {
    dataInputToTheWorld();
    fileDownload(JSON.stringify(theWorld.data), "file.json");
}

saveChanges = wrapper_saveChanges(saveChanges);
// saveChangesToJson = wrapper_saveChanges(saveChangesToJson);
$('.tw-show-save_btn').addEventListener('click', saveChanges);
// $('.tw-show-save_btn').addEventListener('click', saveChangesToJson);


function dataInputToTheWorld(){
    const party = theWorld.data.party;
    const actors = theWorld.data.actors._data['@a'];

    // 金币
    party._gold = +$('.tw-gold').value.trim();

    // 制作等级
    let craftingLevel = [];
    $$('.tw-craftingLevel-input').forEach(item => {
        craftingLevel.push(+item.value);
    });
    party._craftingLevel['@a'] = craftingLevel;
    
    
    // 角色名, 作用：获得已储存在该节点的角色索引
    const roleName = $$('.tw-role-name');
    
    // 角色等级
    const roleLevel = $$('.tw-role-level');
    
    roleLevel.forEach((item, i) => {
        const roleIndex = roleName[i].index;
        
        actors[roleIndex]._level = +item.value;
    });

    // 角色属性加成
    const roleProperty = $$('.tw-role-property');

    roleProperty.forEach((item, i) => {
        console.log(item);
        const rolePropertyInput = item.querySelectorAll('.tw-roleProperty-input');
        const roleIndex = roleName[i].index;
        const values = [];

        for (let j = 0; j < rolePropertyInput.length; j++) {
            const ele = rolePropertyInput[j];

            values.push(+ele.value);
        }
        actors[roleIndex]._paramPlus = values;
    });

}

function wrapper_saveChanges(f) {
    return function () {
        if (theWorld == null || theWorld.data == null) {
            new LightTip('没有存档数据', 2000);
            return;
        };
        this.classList.add('loading');
        f();
        setTimeout(()=> {
            this.classList.remove('loading');
        },1000);
    };
}

async function handleFiles(files) {
    const file = files[0];
    const fileText = await readFileAsync(file);
    const fileDecrypt = LZString.decompressFromBase64(fileText);
    const fileJson = JSON.parse(fileDecrypt);

    const fileArmors = fileJson.armors['@a'];
    const fileWeapons = fileJson.weapons['@a'];
    while(fileArmors.includes(null)) {
        fileArmors.splice(fileArmors.indexOf(null), 1);
    }
    while(fileWeapons.includes(null)) {
        fileWeapons.splice(fileWeapons.indexOf(null), 1);
    }

    theWorld = new TheWorld(fileJson, file.name);
}

/**
 * 仅负责呈现存档数据
 */
class TheWorld {
    constructor(input, name) {
        this.data = input;
        this.name = name;

        this.party();
        this.actors();
    }

    // 玩家
    party() {
        const party = this.data.party;
        const gold = party._gold;
        const craftingLevel = party._craftingLevel;

        $('.tw-gold').value = gold;
        $$('.tw-craftingLevel-input').forEach((item, i)=> {
            item.value = craftingLevel['@a'][i];
        });
    }

    // 角色
    actors() {
        const actors = this.data.actors._data['@a'];
        const party = this.data.party;
        const partyActors = party._actors['@a'];
        const actorsIndex = this.getActorIndex(partyActors, actors);

        cloneNode($('.tw-role-item'), actorsIndex.length - 1, true);
        this.putData(actorsIndex, actors);
    }

    putData(actorsIndex, actors) {
        const roleName = $$('.tw-role-name');
        const roleLevel = $$('.tw-roleLevel-input');
        const roleProperty = $$('.tw-role-property');

        actorsIndex.forEach((item, i) => {
            const members = actors[item];
            const rolePropertyInput = roleProperty[i].querySelectorAll('.tw-roleProperty-input');

            roleName[i].index = item; // 存储角色的索引
            roleName[i].innerHTML = members._name + "-" + members._nickname;
            roleLevel[i].value = members._level;

            for (let j = 0; j < members._paramPlus['@a'].length; j++) {
                const element = members._paramPlus['@a'][j];
                
                rolePropertyInput[j].value = element;
            }
        });
    }

    getActorIndex(partyActors, actors) {
        const actorsIndex = [];
        partyActors.forEach(item => {
            const index = actors.findIndex(actor => actor?._actorId == item);

            if (index != -1) {
                actorsIndex.push(index);
            }
        });
        return actorsIndex;
    }
}