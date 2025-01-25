# FSD architecture

해당 프로젝트는 [FSD architecture](https://feature-sliced.design/kr/)를 따른다.

폴더 구조는 Next.js의 app directory를 사용하기 때문에 아래와 같은 구조를 따른다.

보통의 경우는 segment 단위에서의 barrel file을 import해오는 것이 convention이나,
tree-shaking에 좋지 않은 영향을 끼치기 때문에, 무조건적으로 지키지 않는다.

```text
├── app                # NextJS app 폴더
├── src
│   ├── app            # FSD app 폴더
│   ├── entities
│   ├── features
│   ├── view            # FSD pages 폴더
│   ├── shared
│   ├── widgets
```

## API 로직

### [ApiClient](../src/shared/api/apiClient.ts)

- apiClient는 ky를 이용해서 구현한다.

### [ApiServer](../src/shared/api/apiServer.ts)

- apiServer는 서버사이드단에서 호출되는 fetch를 사용한 함수.

### DTO 타입

[해당 파트](https://feature-sliced.design/kr/docs/guides/examples/types#%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4-%EC%97%94%ED%8B%B0%ED%8B%B0-%EB%B0%8F-%EC%83%81%ED%98%B8-%EC%B0%B8%EC%A1%B0-%EA%B4%80%EA%B3%84)에서 설명하듯, a 도메인의 A DTO가 b 도메인의 B DTO를 포함하고 있을 수 있다. e.g, User의 Address.
그런 경우 cross-import 방식으로 사용하여 다른 엔티티에 대한 공개 API를 `@x`를 사용하여 표기한다.

### Queries

- 쿼리 키는 [query-key-factory](https://github.com/lukemorales/query-key-factory)를 사용하며, entities 폴더에서 관리한다.
- slice 별 폴더 구조는 다음과 같다.

```text
entities
└── domain
    └── api
        ├── @x                          # 공개 API
        |   └── other-domain.ts
        ├── domain.interface.ts         # type 명시 파일
        ├── domain.mutation-service.ts  # create, update, delete와 같은 기능을 하는 service 함수
        ├── domain.server-service.ts    # apiServer를 사용해 server side에서 실행되는 service 함수
        └── domain.query.ts             # query-key-factory를 사용한 쿼리 키 및 함수
```

### Mutations

- mutation은 쿼리와 같이 처리하지 않고, 사용되는 위치의 api segment에서 관리한다.

[관련 문서](https://feature-sliced.design/kr/docs/guides/tech/with-react-query#mutation-%EC%9C%84%EC%B9%98-%EC%84%A4%EC%A0%95-%EB%AC%B8%EC%A0%9C)

### Logs

- src/pages 폴더를 사용하려 하였으나, 빌드 시 [Page Without Valid React Component](https://nextjs.org/docs/messages/page-without-valid-component) 에러가 나서 pages -> views로 네이밍 변경 [2025.01.25]
