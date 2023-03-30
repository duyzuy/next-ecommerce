import React from 'react';
import { NextPage } from 'next';
import { Container, Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import styles from '../styles/page404.module.scss';
import Button from '../components/Button';
import SEO from '../components/common/Seo';

const Page404: NextPage = () => {
  return (
    <>
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <Container style={{ paddingTop: '30px' }}>
        <div className={styles.page__404}>
          <div className="page-inner">
            <div className="page-body">
              <div className="icon-oops">
                <svg
                  width="1004"
                  viewBox="0 0 1004 611"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M378.417 314.001C369.318 352.678 354.162 383.711 332.949 407.1C311.735 430.489 286.774 446.174 258.067 454.153C229.473 462.16 199.43 462.459 167.937 455.051C136.329 447.615 109.526 433.883 87.5278 413.855C65.5296 393.826 50.2362 368.672 41.6474 338.393C33.2 308.027 33.5121 273.562 42.5837 234.999C51.6822 196.322 66.7809 165.275 87.88 141.859C109.094 118.47 133.997 102.773 162.59 94.7657C191.183 86.7589 221.284 86.4733 252.892 93.9087C284.385 101.317 311.144 114.979 333.169 134.893C355.309 154.834 370.66 180.001 379.222 210.394C387.783 240.788 387.515 275.323 378.417 314.001ZM291.495 293.553C296.879 270.667 298.164 250.561 295.351 233.234C292.653 215.934 286.19 201.794 275.962 190.813C265.848 179.86 252.317 172.39 235.368 168.403C218.533 164.443 203.091 165.097 189.04 170.366C174.99 175.635 162.843 185.397 152.601 199.653C142.473 213.936 134.717 232.52 129.333 255.406C123.95 278.292 122.607 298.385 125.305 315.685C128.118 333.012 134.639 347.166 144.867 358.146C155.095 369.126 168.626 376.597 185.461 380.557C202.41 384.544 217.852 383.889 231.788 378.594C245.839 373.325 257.928 363.549 268.056 349.266C278.298 335.01 286.111 316.439 291.495 293.553Z"
                    fill="#2F2E41"
                  />
                  <path
                    d="M585.274 348.074C585.274 372.08 580.658 392.428 571.425 409.118C562.192 425.808 549.692 438.486 533.925 447.151C518.229 455.815 500.615 460.148 481.084 460.148C461.482 460.148 443.833 455.78 428.137 447.044C412.441 438.308 399.976 425.631 390.743 409.011C381.581 392.321 377 372.009 377 348.074C377 324.068 381.581 303.72 390.743 287.03C399.976 270.34 412.441 257.662 428.137 248.997C443.833 240.332 461.482 236 481.084 236C500.615 236 518.229 240.332 533.925 248.997C549.692 257.662 562.192 270.34 571.425 287.03C580.658 303.72 585.274 324.068 585.274 348.074ZM531.368 348.074C531.368 333.869 529.344 321.866 525.296 312.065C521.318 302.264 515.566 294.842 508.037 289.8C500.58 284.757 491.595 282.236 481.084 282.236C470.644 282.236 461.659 284.757 454.131 289.8C446.602 294.842 440.814 302.264 436.766 312.065C432.789 321.866 430.8 333.869 430.8 348.074C430.8 362.278 432.789 374.281 436.766 384.082C440.814 393.884 446.602 401.305 454.131 406.348C461.659 411.391 470.644 413.912 481.084 413.912C491.595 413.912 500.58 411.391 508.037 406.348C515.566 401.305 521.318 393.884 525.296 384.082C529.344 374.281 531.368 362.278 531.368 348.074Z"
                    fill="#2F2E41"
                  />
                  <path
                    d="M620 463.131V238.131H671.563V266.149H673.161C675.291 261.178 678.31 256.384 682.216 251.767C686.193 247.151 691.236 243.386 697.344 240.474C703.523 237.491 710.909 236 719.503 236C730.867 236 741.485 238.983 751.357 244.949C761.3 250.915 769.325 260.112 775.433 272.541C781.541 284.97 784.595 300.808 784.595 320.055C784.595 338.592 781.648 354.111 775.753 366.611C769.929 379.111 762.046 388.486 752.102 394.736C742.23 400.986 731.257 404.111 719.183 404.111C710.945 404.111 703.807 402.761 697.77 400.062C691.733 397.364 686.655 393.813 682.536 389.409C678.487 385.006 675.362 380.283 673.161 375.24H672.095V463.131H620ZM671.03 319.949C671.03 328.756 672.202 336.426 674.546 342.96C676.96 349.494 680.405 354.572 684.879 358.195C689.425 361.746 694.858 363.521 701.179 363.521C707.571 363.521 713.004 361.746 717.479 358.195C721.953 354.572 725.327 349.494 727.6 342.96C729.943 336.426 731.115 328.756 731.115 319.949C731.115 311.142 729.943 303.507 727.6 297.044C725.327 290.581 721.953 285.574 717.479 282.023C713.075 278.472 707.642 276.696 701.179 276.696C694.787 276.696 689.354 278.436 684.879 281.916C680.405 285.396 676.96 290.368 674.546 296.831C672.202 303.294 671.03 311 671.03 319.949Z"
                    fill="#2F2E41"
                  />
                  <path
                    d="M647.913 236.134C687.678 236.134 719.913 203.898 719.913 164.134C719.913 124.369 687.678 92.1338 647.913 92.1338C608.149 92.1338 575.913 124.369 575.913 164.134C575.913 203.898 608.149 236.134 647.913 236.134Z"
                    fill="#B85454"
                  />
                  <path
                    d="M579.586 79.0595C593.941 97.9978 618.974 103.197 618.974 103.197C618.974 103.197 620.731 77.6908 606.375 58.7526C592.02 39.8143 566.988 34.6152 566.988 34.6152C566.988 34.6152 565.23 60.1212 579.586 79.0595Z"
                    fill="#3F3D56"
                  />
                  <path
                    d="M586.19 71.0697C608.192 80.0504 619.676 102.892 619.676 102.892C619.676 102.892 595.488 111.174 573.486 102.193C551.484 93.2126 540 70.3707 540 70.3707C540 70.3707 564.188 62.0891 586.19 71.0697Z"
                    fill="#B85454"
                  />
                  <path
                    d="M610.548 57.7579C607.758 81.3578 622.188 102.463 622.188 102.463C622.188 102.463 641.142 85.3046 643.932 61.7048C646.722 38.1049 632.292 17 632.292 17C632.292 17 613.338 34.1581 610.548 57.7579Z"
                    fill="#3F3D56"
                  />
                  <path
                    d="M620.847 56.5814C630.471 78.3095 622.905 102.731 622.905 102.731C622.905 102.731 599.735 91.9239 590.111 70.1958C580.487 48.4677 588.052 24.0464 588.052 24.0464C588.052 24.0464 611.223 34.8533 620.847 56.5814Z"
                    fill="#B85454"
                  />
                  <path
                    d="M620.132 204.843C640.567 204.843 657.132 188.277 657.132 167.843C657.132 147.408 640.567 130.843 620.132 130.843C599.697 130.843 583.132 147.408 583.132 167.843C583.132 188.277 599.697 204.843 620.132 204.843Z"
                    fill="#F2F2F2"
                  />
                  <path
                    d="M606.096 186.584C612.723 186.584 618.096 181.212 618.096 174.584C618.096 167.957 612.723 162.584 606.096 162.584C599.468 162.584 594.096 167.957 594.096 174.584C594.096 181.212 599.468 186.584 606.096 186.584Z"
                    fill="#3F3D56"
                  />
                  <path
                    d="M657.279 232.591C667.22 232.591 675.279 224.532 675.279 214.591C675.279 204.649 667.22 196.591 657.279 196.591C647.338 196.591 639.279 204.649 639.279 214.591C639.279 224.532 647.338 232.591 657.279 232.591Z"
                    fill="#3F3D56"
                  />
                  <path
                    d="M893.02 301.798C932.785 301.798 965.02 269.562 965.02 229.798C965.02 190.033 932.785 157.798 893.02 157.798C853.256 157.798 821.02 190.033 821.02 229.798C821.02 269.562 853.256 301.798 893.02 301.798Z"
                    fill="#FFD037"
                  />
                  <path
                    d="M848.996 129.957C857.971 151.962 880.81 163.453 880.81 163.453C880.81 163.453 889.098 139.267 880.124 117.262C871.149 95.2579 848.311 83.7671 848.311 83.7671C848.311 83.7671 840.022 107.953 848.996 129.957Z"
                    fill="#3F3D56"
                  />
                  <path
                    d="M857.441 123.945C876.375 138.306 881.567 163.34 881.567 163.34C881.567 163.34 856.06 165.09 837.126 150.729C818.192 136.368 813 111.335 813 111.335C813 111.335 838.507 109.584 857.441 123.945Z"
                    fill="#FFD037"
                  />
                  <path
                    d="M884.411 117.38C875.618 139.457 884.104 163.574 884.104 163.574C884.104 163.574 906.848 151.896 915.641 129.819C924.435 107.741 915.948 83.6245 915.948 83.6245C915.948 83.6245 893.205 95.3022 884.411 117.38Z"
                    fill="#3F3D56"
                  />
                  <path
                    d="M894.664 118.904C898.347 142.381 884.728 164.018 884.728 164.018C884.728 164.018 865.137 147.591 861.454 124.114C857.771 100.637 871.391 79 871.391 79C871.391 79 890.982 95.4271 894.664 118.904Z"
                    fill="#FFD037"
                  />
                  <path
                    d="M889.061 259.227C909.495 259.227 926.061 242.661 926.061 222.227C926.061 201.792 909.495 185.227 889.061 185.227C868.626 185.227 852.061 201.792 852.061 222.227C852.061 242.661 868.626 259.227 889.061 259.227Z"
                    fill="#F2F2F2"
                  />
                  <path
                    d="M873.518 223.908C880.146 223.908 885.518 218.535 885.518 211.908C885.518 205.281 880.146 199.908 873.518 199.908C866.891 199.908 861.518 205.281 861.518 211.908C861.518 218.535 866.891 223.908 873.518 223.908Z"
                    fill="#3F3D56"
                  />
                  <path
                    d="M326 593.312C365.765 593.312 398 561.077 398 521.312C398 481.548 365.765 449.312 326 449.312C286.236 449.312 254 481.548 254 521.312C254 561.077 286.236 593.312 326 593.312Z"
                    fill="#4181E1"
                  />
                  <path
                    d="M957.107 288.095L909.273 289.374C908.776 285.964 907.426 282.946 905.225 280.318C903.023 277.619 900.146 275.524 896.595 274.033C893.115 272.47 889.067 271.689 884.45 271.689C878.414 271.689 873.264 272.896 869.003 275.311C864.813 277.726 862.753 280.993 862.824 285.112C862.753 288.308 864.031 291.078 866.659 293.422C869.358 295.766 874.152 297.648 881.041 299.068L912.575 305.034C928.911 308.159 941.056 313.344 949.01 320.588C957.036 327.832 961.084 337.42 961.155 349.352C961.084 360.574 957.746 370.34 951.141 378.649C944.607 386.959 935.658 393.422 924.294 398.038C912.931 402.584 899.933 404.857 885.303 404.857C861.936 404.857 843.506 400.062 830.012 390.474C816.588 380.815 808.918 367.889 807 351.696L858.456 350.418C859.592 356.384 862.54 360.929 867.298 364.054C872.057 367.179 878.129 368.741 885.516 368.741C892.192 368.741 897.625 367.499 901.815 365.013C906.006 362.527 908.137 359.224 908.208 355.105C908.137 351.412 906.503 348.464 903.307 346.263C900.111 343.99 895.104 342.215 888.286 340.936L859.735 335.503C843.328 332.52 831.112 327.016 823.087 318.99C815.061 310.893 811.084 300.595 811.155 288.095C811.084 277.158 813.996 267.818 819.891 260.077C825.786 252.264 834.166 246.298 845.033 242.179C855.899 238.06 868.719 236 883.492 236C905.651 236 923.122 240.652 935.906 249.956C948.691 259.189 955.757 271.902 957.107 288.095Z"
                    fill="#2F2E41"
                  />
                  <path
                    d="M956.929 279.882C968.251 279.882 977.429 272.718 977.429 263.882C977.429 255.045 968.251 247.882 956.929 247.882C945.608 247.882 936.429 255.045 936.429 263.882C936.429 272.718 945.608 279.882 956.929 279.882Z"
                    fill="#FFD037"
                  />
                  <path
                    d="M294.564 416.823C300.769 439.763 322.025 453.97 322.025 453.97C322.025 453.97 333.219 430.985 327.014 408.045C320.808 385.105 299.552 370.898 299.552 370.898C299.552 370.898 288.358 393.884 294.564 416.823Z"
                    fill="#3F3D56"
                  />
                  <path
                    d="M303.682 411.893C320.711 428.47 322.791 453.951 322.791 453.951C322.791 453.951 297.262 452.558 280.234 435.981C263.206 419.405 261.126 393.923 261.126 393.923C261.126 393.923 286.654 395.317 303.682 411.893Z"
                    fill="#4181E1"
                  />
                  <path
                    d="M331.255 408.688C319.818 429.519 325.28 454.495 325.28 454.495C325.28 454.495 349.285 445.697 360.722 424.866C372.159 404.035 366.697 379.059 366.697 379.059C366.697 379.059 342.691 387.856 331.255 408.688Z"
                    fill="#3F3D56"
                  />
                  <path
                    d="M341.243 411.459C342.017 435.211 325.845 455.012 325.845 455.012C325.845 455.012 308.418 436.305 307.645 412.553C306.871 388.802 323.043 369 323.043 369C323.043 369 340.47 387.707 341.243 411.459Z"
                    fill="#4181E1"
                  />
                  <path
                    d="M323 550.312C343.435 550.312 360 533.747 360 513.312C360 492.878 343.435 476.312 323 476.312C302.566 476.312 286 492.878 286 513.312C286 533.747 302.566 550.312 323 550.312Z"
                    fill="#F2F2F2"
                  />
                  <path
                    d="M312 510C318.628 510 324 504.627 324 498C324 491.373 318.628 486 312 486C305.373 486 300 491.373 300 498C300 504.627 305.373 510 312 510Z"
                    fill="#3F3D56"
                  />
                </svg>
              </div>
              <Header>404 - Nội dung không tồn tại</Header>
              <Button
                type="link"
                href={'/product'}
                icon={() => <Icon.ShoppingBag size={16} />}
                color="primary"
                outline
              >
                Quay trở lại cửa hàng
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Page404;