package com.htcompany.sncommon.graphql.resolver;

import com.htcompany.sncommon.exception.EntityNotFoundException;
import com.htcompany.sncommon.exception.ForbiddenException;
import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import java.time.format.DateTimeParseException;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class ExceptionResolver extends DataFetcherExceptionResolverAdapter {

    @Override
    protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
        GraphqlErrorBuilder errorBuilder = GraphqlErrorBuilder.newError(env)
            .message(StringUtils.hasText(ex.getMessage()) ? ex.getMessage() : ex.getClass().getSimpleName());

        if (ex instanceof ForbiddenException) {
            return errorBuilder
                .errorType(ErrorType.FORBIDDEN)
                .build();
        }
        if (ex instanceof EntityNotFoundException) {
            return errorBuilder
                .errorType(ErrorType.NOT_FOUND)
                .build();
        }
        if (ex instanceof DateTimeParseException ||
            ex instanceof IllegalArgumentException) {
            return errorBuilder
                .errorType(ErrorType.BAD_REQUEST)
                .build();
        }

        return null;
    }
}
