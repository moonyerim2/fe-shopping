# fe-shopping

## 구현 기능
### 검색창 구현하기
- 카테고리
    - [ ]  카테고리를 칸을 클릭하면 리스트가 펼쳐진다.
    - [ ]  카테고리를 선택하면 `전체`가 선택한 카테고리로 글자가 바뀐다.
    - [ ]  창이 열리고 닫길 때 애니메이션으로 동작한다.
- 입력창
    - [ ]  입력창에 focus를 주면 최근 검색어가 노출된다.
    - [ ]  검색어를 입력하면 최근 검색어가 사라진다.
    - [ ]  최근 검색어가 사라지고 자동완성 리스트가 나타난다.
- 입력창 자동완성 기능
    - [ ]  일치하는 글자는 하이라이트 되어 보여진다.
    - [ ]  한 자씩 칠 때 마다 자동완성 결과가 업데이트 되어야 한다.
    - [ ]  500ms 이상 글자를 입력하지 않고 머물러야 서버에서 데이터를 가져온다.
    - [ ]  키보드 방향키로 위 아래로 이동할 수 있다.
    - [ ]  이동해서 선택된 항목이 자동으로 검색창에 입력된다.

### 캐러셀 구현
- [ ]  콘텐츠가 자동으로 순환한다.
- [ ]  리스트에 마우스가 오버되면 해당 콘텐츠를 보여준다.
- [ ]  마우스가 빠르게 지나갈 때는 콘텐츠가 바뀌지 않는다.

## 레이아웃
![Group 1](https://user-images.githubusercontent.com/75062526/158315351-57bfc92e-e5b9-4a0b-9ca4-ab5fce1d855e.png)
![Group 2](https://user-images.githubusercontent.com/75062526/158315482-c965ec01-8aff-487c-bb7b-f69f8eafee91.png)

## 폴더 구조
- 이전까진 파일을 기준으로 폴더 구조를 만들었는데 모듈을 단위로 폴더 구조를 만들면 수정이 필요할 때 관련 파일을 찾기 쉽고 나중에 확장할 때 이점이 있다해서 이 방법을 사용해보려 한다.
```
└─...
  └─┬components
    |
    ├─┬moduleA
    | |
    | ├moduleA.js   //modules controller
    | |
    | ├moduleA.html //modules view
    | |
    | ├moduleA.less //modules style
    | |
    | └moduleA.json //modules data
    |
    └─┬moduleB
      |
      ├moduleB.js
      |
      ├moduleB.html
      |
      ├moduleB.less
      |
      ├moduleB.json
      |
      └moduleB-icon.png
```
