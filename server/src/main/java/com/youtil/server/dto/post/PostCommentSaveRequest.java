package com.youtil.server.dto.post;


import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostComment;
import com.youtil.server.domain.user.User;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostCommentSaveRequest {

    private Long parentId; //대댓글이 달릴 댓글

    @NotBlank(message = "내용이 없습니다.")
    private String content;

    @NotNull(message = "내용이 없습니다.")
    private Boolean isPrivate;

    public PostComment of(User user, Post post, Integer depth) {
        return PostComment.builder().user(user).content(content).post(post).depth(depth).isPrivate(isPrivate).build();
    }

    public PostComment of(User user, Post post, PostComment parent, Integer depth) {
        return PostComment.builder().user(user).content(content).post(post).parent(parent).depth(depth).isPrivate(isPrivate).build();
    }
}
