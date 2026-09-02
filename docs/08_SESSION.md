# Session

## Scope

`Session` không thuộc core API của `@vngamemini/examination` 0.1.x.

Examination chỉ xử lý dữ liệu examination thông qua processing pipeline:

```text
INPUT
  ↓
NORMALIZE
  ↓
VALIDATE
  ↓
EVALUATE
  ↓
SUMMARY
  ↓
SCORE
```

## Application Responsibility

Một application có thể xây dựng session layer bên ngoài Examination để quản lý:

- trạng thái bài làm;
- câu hỏi hiện tại;
- lựa chọn của người dùng;
- tiến trình làm bài;
- bắt đầu và kết thúc phiên;
- chuyển câu hỏi;
- lưu dữ liệu tạm thời;
- submit bài làm.

Application có thể sử dụng Examination để xử lý dữ liệu khi cần.

Dependency phải giữ:

```text
Application Session
        ↓
   Examination
```

Không đưa session lifecycle vào Examination core.

## Future Integration

Nếu sau này cần một session abstraction chính thức, nó phải được thiết kế như một layer mới bên ngoài core processing hiện tại.

Việc bổ sung session không được làm thay đổi processing contract hiện tại nếu không có yêu cầu version rõ ràng.
