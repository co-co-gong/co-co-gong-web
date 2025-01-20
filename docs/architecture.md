# [WIP] FSD architecture

해당 프로젝트는 [FSD architecture](https://feature-sliced.design/kr/)를 따른다.

폴더 구조는 Next.js의 app directory를 사용하기 때문에 아래와 같은 구조를 따른다.

보통의 경우는 segment 단위에서의 barrel file을 import해오는 것이 convention이나, 포함되어 있는 파일이 많아 tree-shaking에 문제가 생길 정도라면, 뎁스를 추가하도록 한다.

```text
├── app                # NextJS app 폴더
├── src
│   ├── app            # FSD app 폴더
│   ├── entities
│   ├── features
│   ├── pages          # FSD pages 폴더
│   ├── shared
│   ├── widgets
```

## API 로직

### [ApiClient](../src/shared/api/apiClient.ts)

- apiClient는 ky를 이용해서 구현한다.

### Queries

- 쿼리 키는 [query-key-factory](https://github.com/lukemorales/query-key-factory)를 사용하며, entities 폴더에서 관리한다.
- slice 별 폴더 구조는 다음과 같다.

```text
entities
└── domain
    └── api
        ├── domain.interface.ts         # type 명시 파일
        ├── domain.mutation-service.ts # create, update, delete와 같은 기능을 하는 service 함수
        └── domain.query.ts             # query-key-factory를 사용한 쿼리 키 및 함수
```

### Mutations

- mutation은 쿼리와 같이 처리하지 않고, 사용되는 위치의 api segment에서 관리한다.

[관련 문서](https://feature-sliced.design/kr/docs/guides/tech/with-react-query#mutation-%EC%9C%84%EC%B9%98-%EC%84%A4%EC%A0%95-%EB%AC%B8%EC%A0%9C)

### Route handlers
