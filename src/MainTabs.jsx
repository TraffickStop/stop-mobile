import React, { useContext, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import { ellipse, square, triangle } from 'ionicons/icons'
import CameraTab from './pages/CameraTab'
import FacesPage from './pages/Faces'
import ResultsPage from './pages/Results'
import Tab2 from './pages/Tab2'
import Tab3 from './pages/Tab3'

import { AnimatePresence } from 'framer-motion'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core'

import { File } from '@ionic-native/file'
import { HTTP } from '@ionic-native/http'

import * as faceapi from '@vladmandic/face-api'
import * as tf from '@vladmandic/face-api/dist/tfjs.esm'

// import * as tfn from '@tensorflow/tfjs-node'

// import './tabs.scss'

import { AppContext } from './State'

const { Filesystem } = Plugins

const MainApp = (props) => {
  const { state, dispatch } = useContext(AppContext)

  const loadModels = async () => {
    const MODEL_URL = 'https://raw.githubusercontent.com/vladmandic/face-api/master/model/' //'assets/models/'

    // const url = `${MODEL_URL}age_gender_model-weights_manifest.json`

    // HTTP.get()

    // try {
    //   let ret = await Filesystem.readdir({
    //     path: '',
    //     directory: FilesystemDirectory.Data
    //   })
    //   console.log(ret)
    // } catch (e) {
    //   console.error('Unable to read dir', e)
    // }

    // console.log('Fetching model json from path ', url)
    // fetch(url)
    //   .then((response) => {
    //     console.log('Fetch worked here to load model', response)
    //     response.json()
    //   })
    //   .then((data) => {
    //     console.log(data)
    //   })
    //   .catch((e) => {
    //     console.log('Fetch failed here to load model', e)
    //   })

    // HTTP.get(url)
    //   .then((res) => {
    //     console.log('Attempting HTTP model load', res)
    //   })
    //   .catch((e) => {
    //     console.log('HTTP failed here to load model', e)
    //   })

    try {
      await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
      await faceapi.loadFaceLandmarkModel(MODEL_URL)
      await faceapi.loadFaceRecognitionModel(MODEL_URL)
      await faceapi.loadFaceDetectionModel(MODEL_URL)
      await faceapi.loadAgeGenderModel(MODEL_URL)
      console.log('Loaded models')
    } catch (e) {
      console.log('Model not loded', e)
    }
  }

  useEffect(() => {
    loadModels()
  }, [])

  useEffect(() => {
    const people = `{
      "data": [
          {
              "name": "Donald Trump",
              "descriptor": {"0":-0.09906005859375,"1":0.1451416015625,"2":-0.0163269080221653,"3":0.020538335666060448,"4":-0.0631103590130806,"5":-0.00448227021843195,"6":0.054962173104286194,"7":-0.1716308742761612,"8":0.1424560546875,"9":-0.09912109375,"10":0.1568603664636612,"11":-0.00897979736328125,"12":-0.332275390625,"13":-0.08636474609375,"14":0.02194214053452015,"15":0.1258545070886612,"16":-0.1853027492761612,"17":-0.1245117262005806,"18":-0.1690673977136612,"19":-0.1499023586511612,"20":0.0450744703412056,"21":0.0256958045065403,"22":-0.044708251953125,"23":-0.009880066849291325,"24":-0.1239624097943306,"25":-0.2042236179113388,"26":-0.0620422437787056,"27":-0.0315551832318306,"28":0.01617431640625,"29":-0.0753173828125,"30":0.0357666052877903,"31":0.042633056640625,"32":-0.2491455078125,"33":-0.1096801906824112,"34":-0.02153015322983265,"35":0.0535888671875,"36":-0.0320739783346653,"37":-0.0355224646627903,"38":0.1061401441693306,"39":0.02874756045639515,"40":-0.1124267578125,"41":0.0345153883099556,"42":0.018157958984375,"43":0.2285156548023224,"44":0.2133789211511612,"45":-0.00448227021843195,"46":-0.0449523963034153,"47":-0.1585693508386612,"48":0.1396484375,"49":-0.2413330078125,"50":-0.0023918161168694496,"51":0.158935546875,"52":0.1298828274011612,"53":0.1440429836511612,"54":0.0316772498190403,"55":-0.138916015625,"56":0.014984133653342724,"57":0.1052246019244194,"58":-0.1405029296875,"59":0.0652465894818306,"60":0.013549805618822575,"61":-0.2099609673023224,"62":-0.01028442569077015,"63":-0.060913100838661194,"64":0.051910411566495895,"65":0.0227813757956028,"66":0.0005288124084472656,"67":-0.1473388671875,"68":0.2138672024011612,"69":-0.1575927734375,"70":-0.162841796875,"71":0.02099609375,"72":-0.034240733832120895,"73":-0.1708984524011612,"74":-0.381591796875,"75":0.0353393591940403,"76":0.332275390625,"77":0.179931640625,"78":-0.2304687798023224,"79":0.010589602403342724,"80":-0.0827026441693306,"81":-0.05242919921875,"82":0.0673828125,"83":0.1007080078125,"84":0.006172180641442537,"85":-0.0931396558880806,"86":-0.1141357421875,"87":0.0388793982565403,"88":0.245361328125,"89":-0.0835571363568306,"90":-0.03790283203125,"91":0.2626953125,"92":0.0314941480755806,"93":0,"94":0.0399169959127903,"95":0.043853759765625,"96":-0.1390380859375,"97":-0.00858306884765625,"98":-0.1423339992761612,"99":-0.1129150465130806,"100":0.06768798828125,"101":-0.10479736328125,"102":-0.00009179121116176248,"103":0.1151123046875,"104":-0.1491699367761612,"105":0.2052002102136612,"106":0.0262298621237278,"107":-0.023498542606830597,"108":-0.0314025953412056,"109":-0.0927734449505806,"110":-0.0241851806640625,"111":0.041015636175870895,"112":0.1647949367761612,"113":-0.1759033501148224,"114":0.2763671875,"115":0.2199707180261612,"116":-0.048156749457120895,"117":0.1534423828125,"118":0.026275642216205597,"119":0.0975952222943306,"120":-0.0365905836224556,"121":-0.0504150465130806,"122":-0.1429443508386612,"123":-0.1499023586511612,"124":0.039093017578125,"125":0.0376892164349556,"126":-0.012619021348655224,"127":0.049041759222745895}
          },
          {
              "name": "Barrack Obama",
              "descriptor": {"0":-0.09063720703125,"1":0.1212158352136612,"2":0.015350344590842724,"3":-0.0919799879193306,"4":0.008934023790061474,"5":0.01263427920639515,"6":-0.07232666015625,"7":-0.0789794921875,"8":0.1929931789636612,"9":-0.10736083984375,"10":0.2435302585363388,"11":0.1055297926068306,"12":-0.2257080078125,"13":-0.1571044921875,"14":0.0535583570599556,"15":0.1268310695886612,"16":-0.1967773586511612,"17":-0.0908813625574112,"18":-0.1475830078125,"19":-0.1472167819738388,"20":0.010482790879905224,"21":0.004074097145348787,"22":0.0911865308880806,"23":0.0504455640912056,"24":-0.16162109375,"25":-0.3486328125,"26":-0.0570373609662056,"27":-0.178466796875,"28":-0.028854375705122948,"29":-0.132568359375,"30":-0.0637817457318306,"31":-0.02110290713608265,"32":-0.172607421875,"33":-0.1150512769818306,"34":0.02725219912827015,"35":-0.01602173037827015,"36":0.016372686251997948,"37":0.0107421875,"38":0.1944580078125,"39":0.0455017127096653,"40":-0.1078491359949112,"41":0.0825805738568306,"42":0.0164032019674778,"43":0.2583008110523224,"44":0.2705078125,"45":0.084228515625,"46":0.0161285400390625,"47":-0.08172607421875,"48":0.1352539211511612,"49":-0.2449951320886612,"50":0.07366943359375,"51":0.1412353515625,"52":0.02442932315170765,"53":0.026702886447310448,"54":0.124755859375,"55":-0.1782226860523224,"56":-0.020065313205122948,"57":0.1297607570886612,"58":-0.1339111328125,"59":0.039978038519620895,"60":0.0029811870772391558,"61":-0.0902710035443306,"62":-0.0753173828125,"63":0.025024421513080597,"64":0.205078125,"65":0.1251220852136612,"66":-0.1429443508386612,"67":-0.07879638671875,"68":0.1538086086511612,"69":-0.0266876220703125,"70":0.0023918161168694496,"71":0.008804322220385075,"72":-0.179931640625,"73":-0.1845703274011612,"74":-0.2607421875,"75":0.0859375,"76":0.388671875,"77":0.1812744140625,"78":-0.2169189453125,"79":-0.005882263649255037,"80":-0.1866455078125,"81":0.0486450158059597,"82":0.0972900316119194,"83":0.03099060244858265,"84":-0.06640625,"85":-0.1007690504193306,"86":-0.0346679724752903,"87":0.07098388671875,"88":0.0854492262005806,"89":0.0636596754193306,"90":-0.047485362738370895,"91":0.2274170219898224,"92":-0.023544317111372948,"93":0.0535583570599556,"94":0.0259704627096653,"95":0.0638427808880806,"96":-0.1798095852136612,"97":-0.029632577672600746,"98":-0.1945800632238388,"99":-0.0503845252096653,"100":0.0370788611471653,"101":-0.004344940185546875,"102":0.0493164137005806,"103":0.1459961086511612,"104":-0.1949462890625,"105":0.07122802734375,"106":0.005920411087572575,"107":-0.0365600623190403,"108":-0.0009312632028013468,"109":0.06640625,"110":-0.0350036695599556,"111":-0.040924083441495895,"112":0.06707763671875,"113":-0.2380371391773224,"114":0.2308349609375,"115":0.2551269829273224,"116":0.0252685584127903,"117":0.1612548977136612,"118":0.0792236328125,"119":-0.0009512904216535389,"120":-0.005363465752452612,"121":-0.023498542606830597,"122":-0.1824951320886612,"123":-0.0501709058880806,"124":0.0392150916159153,"125":0.0549926795065403,"126":0.07415771484375,"127":-0.013305666856467724}
          },
          {
              "name": "Baby Bryce",
              "descriptor": {"0":-0.0667724609375,"1":0.0294494666159153,"2":0.01866150088608265,"3":-0.11090087890625,"4":-0.06951904296875,"5":-0.0326232984662056,"6":0.0003850461507681757,"7":-0.0500183142721653,"8":0.1436767578125,"9":-0.1451416015625,"10":0.18896484375,"11":-0.0404663123190403,"12":-0.1562500149011612,"13":0.0302734412252903,"14":-0.0886230543255806,"15":0.1278076320886612,"16":-0.2314453274011612,"17":-0.1172485426068306,"18":-0.0722045972943306,"19":-0.0250549353659153,"20":-0.009254458360373974,"21":0.10198974609375,"22":-0.0767822265625,"23":0.1374511867761612,"24":-0.1715087890625,"25":-0.2734375,"26":-0.1105957105755806,"27":-0.134765625,"28":-0.005744934547692537,"29":-0.0880126953125,"30":0.002971650566905737,"31":0.1016235426068306,"32":-0.1367187649011612,"33":0.003223419887945056,"34":0.0555114783346653,"35":0.03619384765625,"36":-0.013549805618822575,"37":-0.07977294921875,"38":0.2076416015625,"39":0.0763549879193306,"40":-0.1842041164636612,"41":-0.0214233435690403,"42":0.088134765625,"43":0.351318359375,"44":0.1483154296875,"45":0.0346679724752903,"46":-0.03106689453125,"47":-0.0168151892721653,"48":0.1975097805261612,"49":-0.2487793266773224,"50":-0.0441589392721653,"51":0.1337890774011612,"52":0.124267578125,"53":0.0641479566693306,"54":0.07598876953125,"55":-0.07061767578125,"56":0.0747680738568306,"57":0.0825195387005806,"58":-0.230712890625,"59":0.055389415472745895,"60":-0.025436406955122948,"61":-0.1185913234949112,"62":0.054840102791786194,"63":-0.07745361328125,"64":0.2177734524011612,"65":0.0149917621165514,"66":-0.1297607570886612,"67":-0.0668945387005806,"68":0.2141113132238388,"69":-0.2105713188648224,"70":-0.0770263671875,"71":0.0649414137005806,"72":-0.0704345777630806,"73":-0.1779785305261612,"74":-0.2369384914636612,"75":-0.0405273474752903,"76":0.380126953125,"77":0.1660156548023224,"78":-0.0845336988568306,"79":0.1231689602136612,"80":-0.051116954535245895,"81":-0.1278076320886612,"82":0.040832530707120895,"83":0.1203003004193306,"84":-0.050567626953125,"85":0.01094818115234375,"86":-0.0085678119212389,"87":0.0433349646627903,"88":0.302978515625,"89":-0.006652833428233862,"90":0.0402526929974556,"91":0.2148437798023224,"92":-0.053985610604286194,"93":-0.041931163519620895,"94":0.02297973819077015,"95":-0.0299530066549778,"96":-0.09503173828125,"97":0.012100222520530224,"98":-0.0223388671875,"99":0.10565185546875,"100":-0.01698303036391735,"101":-0.11444091796875,"102":-0.002292633056640625,"103":0.1036377102136612,"104":-0.2436523586511612,"105":0.1405029296875,"106":-0.00877380557358265,"107":-0.07049560546875,"108":-0.003347398480400443,"109":0.0398559607565403,"110":-0.1489257961511612,"111":-0.041107188910245895,"112":0.1770019680261612,"113":-0.304931640625,"114":0.1606445461511612,"115":0.13818359375,"116":-0.001983643276616931,"117":0.1155395656824112,"118":-0.007400513626635075,"119":0.02047729678452015,"120":-0.0349731519818306,"121":-0.055145263671875,"122":-0.1834716945886612,"123":-0.142578125,"124":0.1176147609949112,"125":-0.1110839918255806,"126":0.0651855543255806,"127":-0.0309753455221653}
          },
          {
              "name": "Shelby",
              "descriptor": {"0":-0.0693969801068306,"1":0.0380554273724556,"2":0.0637817457318306,"3":-0.0891723707318306,"4":-0.1474609375,"5":-0.0485534742474556,"6":-0.02442932315170765,"7":-0.1212768703699112,"8":0.1612548977136612,"9":-0.1607666164636612,"10":0.1458740383386612,"11":-0.1171875,"12":-0.2384033352136612,"13":0.1185302883386612,"14":-0.0728759765625,"15":0.1599121242761612,"16":-0.0772094801068306,"17":-0.1474609375,"18":-0.08123779296875,"19":-0.095703125,"20":0.026824951171875,"21":0.1257324367761612,"22":-0.0573425367474556,"23":0.1348877102136612,"24":-0.12158203125,"25":-0.2060547173023224,"26":-0.07281494140625,"27":-0.0250549353659153,"28":-0.034332275390625,"29":-0.03106689453125,"30":0.08160400390625,"31":0.1111450344324112,"32":-0.1494140625,"33":0.003841400844976306,"34":0.0927124097943306,"35":0.0775146558880806,"36":0.00448227021843195,"37":-0.1610107421875,"38":0.179931640625,"39":0.07537841796875,"40":-0.263916015625,"41":-0.06182863190770149,"42":0.077880859375,"43":0.32666015625,"44":0.0637817457318306,"45":0.0268096961081028,"46":-0.0424499586224556,"47":-0.1178588941693306,"48":0.154296875,"49":-0.2929687798023224,"50":-0.01942444033920765,"51":0.1623535305261612,"52":-0.013877869583666325,"53":0.039154052734375,"54":0.0570373609662056,"55":-0.1717529296875,"56":0.178955078125,"57":0.1107177734375,"58":-0.2281494140625,"59":0.0033073434606194496,"60":0.0849609449505806,"61":-0.1238403394818306,"62":0.04412841796875,"63":-0.09912109375,"64":0.273193359375,"65":0.0638427808880806,"66":-0.1185302883386612,"67":-0.084228515625,"68":0.125,"69":-0.1453857421875,"70":-0.0955200269818306,"71":0.0841674879193306,"72":-0.1152954176068306,"73":-0.1593017727136612,"74":-0.298095703125,"75":0.007053375244140625,"76":0.4570312798023224,"77":0.1319580227136612,"78":-0.1048583984375,"79":0.139404296875,"80":-0.0190124548971653,"81":0.0285797119140625,"82":0.0913086012005806,"83":0.1619873046875,"84":-0.057220458984375,"85":0.0027885446324944496,"86":-0.0357666052877903,"87":0.00870513916015625,"88":0.259033203125,"89":-0.0389404371380806,"90":-0.005825044121593237,"91":0.2626953125,"92":-0.0243682861328125,"93":-0.0791626051068306,"94":0.034759521484375,"95":0.0466613844037056,"96":-0.1383056640625,"97":-0.018463134765625,"98":-0.055816661566495895,"99":0.003011704422533512,"100":0.0914306640625,"101":-0.0556030347943306,"102":0.047485362738370895,"103":0.1329345852136612,"104":-0.340576171875,"105":0.1550293117761612,"106":-0.0379638671875,"107":-0.0894775390625,"108":0.0335083082318306,"109":-0.0255279578268528,"110":-0.0802612379193306,"111":-0.00865936279296875,"112":0.1573486477136612,"113":-0.282958984375,"114":0.1484375149011612,"115":0.11444091796875,"116":0.0588989332318306,"117":0.1696777492761612,"118":0.062469497323036194,"119":0.0631713941693306,"120":-0.01855468936264515,"121":-0.0281524695456028,"122":-0.1124878078699112,"123":-0.1214599683880806,"124":0.1097412183880806,"125":-0.0557861402630806,"126":0.0431823804974556,"127":0.015068055130541325}
          },{
              "name": "Phoebe",
              "descriptor": {"0":-0.06915283203125,"1":0.1285400539636612,"2":0.0765991285443306,"3":-0.1196289211511612,"4":-0.1436767578125,"5":-0.01603698916733265,"6":-0.0401916578412056,"7":-0.1331787109375,"8":0.238525390625,"9":-0.1876220703125,"10":0.139404296875,"11":-0.015602112747728825,"12":-0.1899414211511612,"13":-0.0007886888342909515,"14":-0.01597595401108265,"15":0.2171631008386612,"16":-0.1456298828125,"17":-0.1857910305261612,"18":-0.1484375149011612,"19":-0.050048843026161194,"20":-0.0122222900390625,"21":0.07232666015625,"22":-0.02565002627670765,"23":0.0910034254193306,"24":-0.1153564453125,"25":-0.327392578125,"26":-0.0246124304831028,"27":0.026153570041060448,"28":0.0903930738568306,"29":-0.0264434851706028,"30":-0.0988769605755806,"31":0.1298828274011612,"32":-0.2044677734375,"33":-0.0319213904440403,"34":0.041015636175870895,"35":0.1474609375,"36":-0.0776367262005806,"37":-0.1064453199505806,"38":0.1223754957318306,"39":0.07568359375,"40":-0.287353515625,"41":-0.0179443396627903,"42":0.01000213623046875,"43":0.254638671875,"44":0.2332763820886612,"45":-0.008995057083666325,"46":0.0563659742474556,"47":-0.09429931640625,"48":0.1275634914636612,"49":-0.3486328125,"50":0.034332275390625,"51":0.1859130859375,"52":-0.01410675048828125,"53":0.0645752027630806,"54":0.06707763671875,"55":-0.1567382961511612,"56":-0.012977602891623974,"57":0.1384277492761612,"58":-0.15869140625,"59":0.03826904296875,"60":0.1365966796875,"61":-0.0903930738568306,"62":-0.0556030347943306,"63":-0.1331787109375,"64":0.189453125,"65":0.1174926832318306,"66":-0.1345214992761612,"67":-0.1446533203125,"68":0.1997070461511612,"69":-0.1645508110523224,"70":-0.057434096932411194,"71":0.0401001051068306,"72":-0.09600830078125,"73":-0.1782226860523224,"74":-0.2724609375,"75":0.0323181226849556,"76":0.46044921875,"77":0.2430420070886612,"78":-0.0879516750574112,"79":0.056121837347745895,"80":-0.0956420972943306,"81":-0.005653382278978825,"82":0.050811778753995895,"83":0.10479736328125,"84":-0.013381957076489925,"85":-0.0113143939524889,"86":-0.0372619666159153,"87":0.062469497323036194,"88":0.2373046875,"89":0.002910614712163806,"90":0.024566657841205597,"91":0.293212890625,"92":0.019989019259810448,"93":-0.008666993118822575,"94":-0.0721435546875,"95":0.048431407660245895,"96":-0.1134033352136612,"97":0.010589602403342724,"98":-0.1439209133386612,"99":-0.029281623661518097,"100":0.007514955010265112,"101":-0.01943969912827015,"102":0.043731700628995895,"103":0.1606445461511612,"104":-0.1859130859375,"105":0.221923828125,"106":-0.010498046875,"107":0.0452575758099556,"108":0.0711669996380806,"109":0.02920532412827015,"110":-0.0922241285443306,"111":-0.08843994140625,"112":0.1177978664636612,"113":-0.1937256008386612,"114":0.1362304836511612,"115":0.1997070461511612,"116":0.10113525390625,"117":0.1174926832318306,"118":0.10382080078125,"119":0.07061767578125,"120":0.0895996168255806,"121":-0.0692138746380806,"122":-0.1612548977136612,"123":-0.0853271484375,"124":0.06475830078125,"125":-0.07098388671875,"126":-0.01751708984375,"127":0.07244873046875}
          },
          {
              "name":"Tagg",
              "descriptor": {"0":-0.1094970777630806,"1":0.06500244140625,"2":0.034393310546875,"3":-0.0822754055261612,"4":-0.1599121242761612,"5":-0.0451355017721653,"6":-0.026474004611372948,"7":-0.040435802191495895,"8":0.119873046875,"9":-0.094482421875,"10":0.1865234375,"11":-0.0665283203125,"12":-0.260009765625,"13":0.0082016009837389,"14":0.008331298828125,"15":0.1944580078125,"16":-0.1667480617761612,"17":-0.1220703125,"18":-0.13720703125,"19":-0.073974609375,"20":-0.10601806640625,"21":0.012687684036791325,"22":-0.0457763709127903,"23":0.0823364332318306,"24":-0.010139468125998974,"25":-0.307861328125,"26":-0.0674438551068306,"27":-0.09906005859375,"28":0.09515380859375,"29":-0.11224365234375,"30":-0.0525817945599556,"31":0.1303711086511612,"32":-0.1101074293255806,"33":-0.0442504920065403,"34":0.0904541015625,"35":0.0791626051068306,"36":-0.1042480617761612,"37":-0.0919799879193306,"38":0.27734375,"39":0.0387878455221653,"40":-0.2158203125,"41":-0.0819702222943306,"42":0.023651123046875,"43":0.2509765923023224,"44":0.264404296875,"45":0.0396423377096653,"46":0.0035247812047600746,"47":-0.0294342078268528,"48":0.15966796875,"49":-0.2447509914636612,"50":0.0174865759909153,"51":0.2026367336511612,"52":0.1066284254193306,"53":0.0676269605755806,"54":0.0266265906393528,"55":-0.1276855617761612,"56":0.0654907301068306,"57":0.1234130933880806,"58":-0.2031250298023224,"59":-0.0639038160443306,"60":0.09063720703125,"61":-0.221435546875,"62":-0.0292358435690403,"63":-0.0382995642721653,"64":0.2153320610523224,"65":0.08172607421875,"66":-0.07244873046875,"67":-0.1407470852136612,"68":0.215576171875,"69":-0.1966552883386612,"70":-0.0825805738568306,"71":0.0169219970703125,"72":-0.1096801906824112,"73":-0.1099853590130806,"74":-0.2437744289636612,"75":0.007640840020030737,"76":0.370361328125,"77":0.1569824367761612,"78":-0.08599853515625,"79":0.0855712890625,"80":-0.0164337158203125,"81":-0.1361083984375,"82":0.046600352972745895,"83":0.1142578274011612,"84":-0.1246948316693306,"85":-0.09637451171875,"86":-0.026214599609375,"87":-0.0336608923971653,"88":0.2197265774011612,"89":-0.0259246826171875,"90":0.0478515625,"91":0.1002197265625,"92":-0.03289794921875,"93":-0.0009374619112350047,"94":0.044921875,"95":-0.056152358651161194,"96":-0.07025146484375,"97":-0.04571533203125,"98":-0.0684814527630806,"99":-0.030410772189497948,"100":-0.02388000674545765,"101":-0.12323000282049179,"102":0.00994110107421875,"103":0.0910034254193306,"104":-0.2211914211511612,"105":0.1539306640625,"106":-0.038238536566495895,"107":-0.02705383487045765,"108":-0.0452270582318306,"109":-0.0689697340130806,"110":-0.051574718207120895,"111":-0.002849579555913806,"112":0.1873779296875,"113":-0.1817627251148224,"114":0.1959228515625,"115":0.1665039211511612,"116":0.028686529025435448,"117":0.1152343899011612,"118":0.10272216796875,"119":0.054718017578125,"120":-0.0026874542236328125,"121":-0.0498962439596653,"122":-0.1856689602136612,"123":-0.111328125,"124":0.1190185695886612,"125":-0.02033996768295765,"126":0.08056640625,"127":0.00442123506218195}
          },
          {
              "name" : "Rachel",
              "descriptor": {"0":-0.0592041090130806,"1":0.1546631008386612,"2":0.1170044019818306,"3":-0.024230964481830597,"4":-0.13720703125,"5":0.0389709509909153,"6":-0.007492066826671362,"7":-0.0946655347943306,"8":0.1566162109375,"9":-0.0578613318502903,"10":0.200927734375,"11":-0.0326538160443306,"12":-0.3916015625,"13":0.0192565955221653,"14":-0.0087661761790514,"15":0.1655273586511612,"16":-0.179443359375,"17":-0.1317138820886612,"18":-0.1568603664636612,"19":0.059448253363370895,"20":0.03059387393295765,"21":0.07672119140625,"22":-0.05633544921875,"23":0.0319519080221653,"24":-0.15966796875,"25":-0.3935546875,"26":-0.028900152072310448,"27":-0.0463867224752903,"28":-0.0677490234375,"29":-0.083740234375,"30":-0.038726806640625,"31":0.0526428297162056,"32":-0.1400146633386612,"33":-0.0086288470774889,"34":0.06927490234375,"35":0.0178527869284153,"36":-0.046020522713661194,"37":-0.1793212890625,"38":0.10089111328125,"39":0.0164642371237278,"40":-0.3208008110523224,"41":-0.027511604130268097,"42":0.0346679724752903,"43":0.2368164360523224,"44":0.25244140625,"45":-0.0005574229871854186,"46":0.042907726019620895,"47":-0.1362304836511612,"48":0.1658935546875,"49":-0.4033203125,"50":-0.0384216383099556,"51":0.1678466796875,"52":-0.014137271791696548,"53":0.02015686221420765,"54":0.1094970777630806,"55":-0.217529296875,"56":-0.0167236365377903,"57":0.1169433742761612,"58":-0.2401123046875,"59":0.01802063174545765,"60":0.0921020582318306,"61":-0.1211547926068306,"62":-0.043273936957120895,"63":-0.1359863430261612,"64":0.139404296875,"65":0.0927734449505806,"66":-0.1779785305261612,"67":-0.1346435546875,"68":0.1424560546875,"69":-0.1945800632238388,"70":0.013305666856467724,"71":0.1195068433880806,"72":-0.0963134840130806,"73":-0.28271484375,"74":-0.262451171875,"75":-0.003501893486827612,"76":0.478759765625,"77":0.1992187649011612,"78":-0.1776123195886612,"79":0.0001078844434232451,"80":-0.1179199293255806,"81":0.0514831580221653,"82":0.0779419019818306,"83":0.0891113430261612,"84":0.0203094482421875,"85":-0.0358581617474556,"86":-0.1383056640625,"87":0.0339965894818306,"88":0.273193359375,"89":-0.046813976019620895,"90":0.04296875,"91":0.3427734375,"92":-0.033294677734375,"93":-0.083984375,"94":0.013687134720385075,"95":0.0866699293255806,"96":-0.1489257961511612,"97":-0.025680547580122948,"98":-0.097412109375,"99":-0.030151374638080597,"100":0.0701294019818306,"101":-0.0855102613568306,"102":0.0387878455221653,"103":0.1147461012005806,"104":-0.1839599758386612,"105":0.1395263671875,"106":-0.0341186560690403,"107":0.041503921151161194,"108":0.0975341796875,"109":-0.1591796875,"110":-0.0727539137005806,"111":-0.0012922290479764342,"112":0.1920166015625,"113":-0.300537109375,"114":0.1470947265625,"115":0.1065063625574112,"116":-0.006172180641442537,"117":0.1204223707318306,"118":0.011383059434592724,"119":0.0512695387005806,"120":-0.0466613844037056,"121":-0.1074829176068306,"122":-0.1796875,"123":-0.1025390625,"124":0.0631103590130806,"125":-0.04718017578125,"126":0.0214386023581028,"127":-0.0849609449505806}
          },
          {
              "name": "Eric",
              "descriptor": {"0":-0.07049560546875,"1":0.11798095703125,"2":0.011520388536155224,"3":-0.0675048828125,"4":-0.1369629055261612,"5":-0.01914978213608265,"6":0.01045989990234375,"7":-0.1076660305261612,"8":0.1435547024011612,"9":-0.1181030347943306,"10":0.046539306640625,"11":-0.0531005859375,"12":-0.2481689751148224,"13":0.03826904296875,"14":-0.01394653506577015,"15":0.1308593899011612,"16":-0.1244506910443306,"17":-0.1478271484375,"18":-0.1251220852136612,"19":-0.1625976711511612,"20":0.0578308179974556,"21":0.0902710035443306,"22":-0.08587646484375,"23":-0.01085662841796875,"24":-0.1066894605755806,"25":-0.303466796875,"26":-0.08978271484375,"27":-0.05755615234375,"28":0.06591796875,"29":-0.07373046875,"30":-0.046112071722745895,"31":-0.007717133034020662,"32":-0.1169433742761612,"33":-0.073974609375,"34":0.0530700720846653,"35":0.027481086552143097,"36":-0.0399169959127903,"37":-0.040985118597745895,"38":0.1541748046875,"39":0.0886230543255806,"40":-0.1529541164636612,"41":0.056976333260536194,"42":0.056762710213661194,"43":0.34033203125,"44":0.1373291015625,"45":0.0650634765625,"46":0.0438842810690403,"47":-0.0753173828125,"48":0.0853271484375,"49":-0.2283935546875,"50":0.061431884765625,"51":0.1217041164636612,"52":0.090087890625,"53":0.0908203125,"54":0.0665283203125,"55":-0.168701171875,"56":0.0005254748393781483,"57":0.06976318359375,"58":-0.209228515625,"59":0.1358642429113388,"60":0.1276855617761612,"61":-0.1072998046875,"62":-0.0435180701315403,"63":-0.0164184607565403,"64":0.2355957329273224,"65":0.1192626953125,"66":-0.07281494140625,"67":-0.1390380859375,"68":0.1732177883386612,"69":-0.2037353813648224,"70":-0.0632934644818306,"71":-0.0807495191693306,"72":-0.0849609449505806,"73":-0.0773315504193306,"74":-0.2239990383386612,"75":0.0509948804974556,"76":0.4536133110523224,"77":0.1163940504193306,"78":-0.168212890625,"79":-0.01654052734375,"80":-0.0615844801068306,"81":-0.01844787783920765,"82":0.1593017727136612,"83":0.0762329176068306,"84":-0.1007690504193306,"85":-0.0403137244284153,"86":-0.019989019259810448,"87":0.066162109375,"88":0.2430420070886612,"89":-0.0619201697409153,"90":-0.021728521212935448,"91":0.1843261867761612,"92":0.0541992224752903,"93":-0.006587983574718237,"94":0.0373840406537056,"95":0.024017339572310448,"96":-0.1594238430261612,"97":-0.01568603701889515,"98":-0.0573425367474556,"99":-0.011398318223655224,"100":0.046112071722745895,"101":-0.1721191704273224,"102":0.0634765699505806,"103":0.1821289211511612,"104":-0.1994629055261612,"105":0.1975097805261612,"106":-0.01538086123764515,"107":-0.05267333984375,"108":-0.0248260535299778,"109":0.0743408203125,"110":-0.0780029296875,"111":-0.0822754055261612,"112":0.1645508110523224,"113":-0.1580810695886612,"114":0.18896484375,"115":0.25634765625,"116":-0.009269715286791325,"117":0.11492919921875,"118":-0.01015472412109375,"119":0.060577407479286194,"120":0.052948009222745895,"121":0.0608825646340847,"122":-0.1439209133386612,"123":-0.07879638671875,"124":0.006984710693359375,"125":-0.012435916811227798,"126":-0.015556336380541325,"127":0.0632934644818306}
          },
          {
              "name": "Emma",
              "descriptor": {"0":-0.0441589392721653,"1":0.006210328079760075,"2":0.0365905836224556,"3":-0.0952758863568306,"4":-0.1192016676068306,"5":-0.0315246619284153,"6":-0.053405772894620895,"7":-0.1080322265625,"8":0.236328125,"9":-0.1925048828125,"10":0.1523437649011612,"11":-0.0743408203125,"12":-0.2861328125,"13":0.0939331129193306,"14":-0.1488037109375,"15":0.1812744140625,"16":-0.1767578125,"17":-0.1135864332318306,"18":-0.0953979566693306,"19":-0.1667480617761612,"20":0.0722045972943306,"21":0.029693609103560448,"22":-0.006446839775890112,"23":0.1513671875,"24":-0.1458740383386612,"25":-0.2812500298023224,"26":-0.0975952222943306,"27":-0.1270752102136612,"28":-0.004905702080577612,"29":-0.1043701171875,"30":0.00691986083984375,"31":0.10174560546875,"32":-0.0870361402630806,"33":0.0314331129193306,"34":-0.0018892298685386777,"35":0.007835390977561474,"36":-0.0299530066549778,"37":-0.1203003004193306,"38":0.2215576320886612,"39":0.014518740586936474,"40":-0.1594238430261612,"41":-0.01766967959702015,"42":0.1153564453125,"43":0.2364502102136612,"44":0.1812744140625,"45":0.043487560003995895,"46":0.058532729744911194,"47":-0.040130626410245895,"48":0.1341552734375,"49":-0.357421875,"50":-0.02531433291733265,"51":0.1489257961511612,"52":0.138916015625,"53":0.1013183668255806,"54":0.190673828125,"55":-0.230712890625,"56":-0.0008749966509640217,"57":0.1015014722943306,"58":-0.1204833984375,"59":0.1779785305261612,"60":-0.00842285342514515,"61":-0.06903076171875,"62":-0.01565551944077015,"63":-0.0729370191693306,"64":0.27783203125,"65":0.10638427734375,"66":-0.1768798828125,"67":-0.1000366285443306,"68":0.253662109375,"69":-0.2341308742761612,"70":-0.055267348885536194,"71":0.1396484375,"72":-0.0665283203125,"73":-0.2071533352136612,"74":-0.1281738430261612,"75":-0.077880859375,"76":0.358154296875,"77":0.2279052883386612,"78":-0.1899414211511612,"79":0.056762710213661194,"80":-0.1210937649011612,"81":-0.0359497144818306,"82":-0.006492615677416325,"83":0.0983886793255806,"84":0.0178070105612278,"85":-0.03125,"86":-0.0841064453125,"87":-0.0458068810403347,"88":0.2246094048023224,"89":-0.0476379431784153,"90":0.04498291015625,"91":0.39013671875,"92":0.0328064039349556,"93":-0.0140914935618639,"94":-0.045379638671875,"95":0.0444641150534153,"96":-0.2032470852136612,"97":-0.0223693884909153,"98":-0.0342712476849556,"99":-0.029113775119185448,"100":0.035919189453125,"101":-0.0452575758099556,"102":0.001693726284429431,"103":0.0131454486399889,"104":-0.202392578125,"105":0.1962890774011612,"106":-0.1173706203699112,"107":0.014671329408884048,"108":-0.041778575628995895,"109":0.0486755408346653,"110":-0.0863037109375,"111":0.034088134765625,"112":0.229248046875,"113":-0.3283691704273224,"114":0.12158203125,"115":0.16845703125,"116":-0.002277374267578125,"117":0.1402588039636612,"118":-0.0198822021484375,"119":0.0770263671875,"120":0.051574718207120895,"121":-0.1069336012005806,"122":-0.157958984375,"123":-0.1282959133386612,"124":-0.029754646122455597,"125":-0.1645508110523224,"126":-0.0848388746380806,"127":0.0480041578412056}
  
          },
          {
            "name" : "Isabella Passmore",
            "descriptor": {"0":-0.0641479566693306,"1":0.0798950269818306,"2":0.0961303785443306,"3":-0.1513671875,"4":-0.1508789211511612,"5":-0.03387451171875,"6":-0.06695556640625,"7":-0.0924072340130806,"8":0.1884765625,"9":-0.1358642429113388,"10":0.266845703125,"11":-0.041259776800870895,"12":-0.2365722805261612,"13":-0.005886079277843237,"14":-0.0442504920065403,"15":0.1904296875,"16":-0.1536865234375,"17":-0.1275634914636612,"18":-0.049102794378995895,"19":0.0011749267578125,"20":0.0322265699505806,"21":0.07489013671875,"22":-0.0441589392721653,"23":0.073486328125,"24":-0.0747680738568306,"25":-0.3544921875,"26":-0.0916747972369194,"27":-0.0765380859375,"28":-0.0137939453125,"29":-0.0921020582318306,"30":0.01596069522202015,"31":0.049499522894620895,"32":-0.07684326171875,"33":0.02999878115952015,"34":0.0481262281537056,"35":0.041503921151161194,"36":-0.0977783203125,"37":-0.1639404445886612,"38":0.2308349609375,"39":0.0629882887005806,"40":-0.26171875,"41":0.0080795306712389,"42":0.0347290113568306,"43":0.290771484375,"44":0.188720703125,"45":-0.051666270941495895,"46":0.0521240308880806,"47":-0.1413574367761612,"48":0.1771240383386612,"49":-0.280517578125,"50":0.006961824372410774,"51":0.1884765625,"52":0.055877685546875,"53":0.060577407479286194,"54":0.06640625,"55":-0.046997085213661194,"56":0.0354003943502903,"57":0.162841796875,"58":-0.26416015625,"59":0.0386962927877903,"60":0.11627197265625,"61":-0.12457275390625,"62":-0.07568359375,"63":-0.1561279296875,"64":0.2293701171875,"65":0.1641845852136612,"66":-0.1938476711511612,"67":-0.1614990383386612,"68":0.1427002102136612,"69":-0.1844482570886612,"70":-0.1752929836511612,"71":0.045593272894620895,"72":-0.150390625,"73":-0.1723632961511612,"74":-0.259033203125,"75":-0.01579284854233265,"76":0.402099609375,"77":0.1567382961511612,"78":-0.2001953423023224,"79":0.038238536566495895,"80":-0.066650390625,"81":-0.045196544378995895,"82":0.057373058050870895,"83":0.1947021633386612,"84":0.01995849795639515,"85":-0.05389404296875,"86":-0.0357666052877903,"87":-0.025573737919330597,"88":0.2403564751148224,"89":-0.057952895760536194,"90":0.0350647047162056,"91":0.27734375,"92":0.02127075381577015,"93":0.0260620154440403,"94":-0.0224151648581028,"95":0.0391845777630806,"96":-0.1076660305261612,"97":-0.0368957556784153,"98":-0.0865478590130806,"99":-0.0330200232565403,"100":-0.03759765625,"101":-0.0276031494140625,"102":0.0172729529440403,"103":0.11273193359375,"104":-0.2202148586511612,"105":0.259765625,"106":0.00557708740234375,"107":-0.0035781871993094683,"108":0.0629272535443306,"109":-0.0404052734375,"110":-0.00155735039152205,"111":-0.0446472205221653,"112":0.1450195461511612,"113":-0.2216797024011612,"114":0.1667480617761612,"115":0.1121826246380806,"116":0.1282959133386612,"117":0.1153564453125,"118":0.0445861853659153,"119":0.055969253182411194,"120":-0.0364990271627903,"121":-0.0748291090130806,"122":-0.189453125,"123":-0.0615234449505806,"124":0.010322573594748974,"125":-0.0224609375,"126":0.024139404296875,"127":-0.013755802065134048}
          }
      ]
  }`
    // console.log('Wrote file')
    File.writeExistingFile(File.dataDirectory, 'missing_persons.json', people)
  }, [])

  return (
    <IonRouterOutlet>
      <AnimatePresence exitBeforeEnter>
        <Route path='/main/:tab(camera)' component={CameraTab} exact />
        <Route path='/main/:tab(camera)/faces' component={FacesPage} exact />
        <Route path='/main/:tab(camera)/results' component={ResultsPage} exact />
        <Route path='/' render={() => <Redirect to='/main/:tab(camera)' />} exact />
      </AnimatePresence>
    </IonRouterOutlet>
  )

  return (
    <IonTabs>
      <IonRouterOutlet>
        <AnimatePresence exitBeforeEnter>
          <Route path='/main/:tab(camera)' component={CameraTab} exact />
          <Route path='/main/:tab(camera)/faces' component={FacesPage} exact />
          <Route path='/main/:tab(camera)/results' component={ResultsPage} exact />
          <Route path='/' render={() => <Redirect to='/main/:tab(camera)' />} exact />
        </AnimatePresence>
      </IonRouterOutlet>

      <IonTabBar slot='bottom' className='tabs'>
        <IonTabButton tab='home' href='/main/camera'>
          <IonIcon icon={ellipse} />
        </IonTabButton>
        <IonTabButton tab='repository' href='/main/upload'>
          <IonIcon icon={triangle} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default MainApp
