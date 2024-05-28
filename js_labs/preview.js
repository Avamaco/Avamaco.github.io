var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function get_pic(nr) {
    return __awaiter(this, void 0, void 0, function () {
        var response, rects;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://127.0.0.1:8000/pics/" + nr.toString(), {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            "Access-Control-Allow-Origin": 'http://127.0.0.1:3000',
                            "Accept": "application/json",
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    rects = _a.sent();
                    return [2 /*return*/, rects];
            }
        });
    });
}
function get_number_of_pics() {
    return __awaiter(this, void 0, void 0, function () {
        var response, cnt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://127.0.0.1:8000/pics", {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            "Access-Control-Allow-Origin": 'http://127.0.0.1:3000',
                            "Accept": "application/json",
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    cnt = _a.sent();
                    return [2 /*return*/, cnt];
            }
        });
    });
}
function pic_err(svg_nr, msg) {
    var s = '<p>' + msg + '</p>';
    var btn = "<button id = 'reload" + svg_nr.toString() + "'  type=\"button\" class=\"btn btn-warning\">Spróbuj ponownie</button>";
    document.getElementById("obrazek" + svg_nr.toString() + "_btn").innerHTML = btn;
    document.getElementById("obrazek" + svg_nr.toString()).innerHTML = s;
    document.getElementById("reload" + svg_nr.toString()).onclick = function () {
        document.getElementById("obrazek" + svg_nr.toString() + "_btn").innerHTML = "";
        document.getElementById("obrazek" + svg_nr.toString()).innerHTML = "<div class=\"spinner-border\" role=\"status\"></div>";
        draw_pic(svg_nr);
    };
}
function draw_pic(svg_nr) {
    return __awaiter(this, void 0, void 0, function () {
        var nr, rects, error_1, s, i, d;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nr = 0;
                    rects = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, get_number_of_pics()];
                case 2:
                    nr = _a.sent();
                    return [4 /*yield*/, get_pic(getRandomInt(nr) + 1)];
                case 3:
                    rects = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log("Wykryto błąd", error_1);
                    return [2 /*return*/];
                case 5:
                    s = "";
                    if (rects['detail'] != undefined) {
                        pic_err(svg_nr, 'Błąd podczas pobierania obrazka!');
                        return [2 /*return*/];
                    }
                    if (rects.length > 10000) {
                        pic_err(svg_nr, 'Pobrano za duży obrazek!');
                        return [2 /*return*/];
                    }
                    else {
                        s = '<svg width="500" height="500" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" style="background-color:white">\n';
                        for (i = 0; i < rects.length; i++) {
                            d = rects[i];
                            s = s + "<rect x='" + d['x'] + "' y='" + d['y'] + "' width='" + d['w'] + "' height='" + d['h'] + "' fill='" + d['color'] + "'></rect>\n";
                        }
                        s = s + '</svg>';
                    }
                    document.getElementById("obrazek" + svg_nr.toString()).innerHTML = s;
                    return [2 /*return*/];
            }
        });
    });
}
for (var i = 1; i < 4; i++) {
    draw_pic(i);
}