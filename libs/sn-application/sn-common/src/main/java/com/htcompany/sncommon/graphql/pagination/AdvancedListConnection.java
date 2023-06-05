package com.htcompany.sncommon.graphql.pagination;

import graphql.relay.Connection;
import graphql.relay.SimpleListConnection;
import graphql.schema.DataFetchingEnvironment;
import java.util.List;

public class AdvancedListConnection<T> extends SimpleListConnection<T> {

    public AdvancedListConnection(List<T> data) {
        super(data);
    }

    public AdvancedListConnection(List<T> data, String prefix) {
        super(data, prefix);
    }

    public Connection<T> getWithCount(DataFetchingEnvironment environment, int totalCount) {
        Connection<T> connection = this.get(environment);

        return new AdvancedConnection<>(
            connection.getEdges(),
            connection.getPageInfo(),
            totalCount
        );
    }
}
