defmodule ChannelsWeb.TsTypes do
  schema_path = Path.join(__DIR__, "../../priv/schema.yaml")
  @external_resource schema_path

  schema = schema_path |> File.read!() |> YamlElixir.read_from_string!()
  output = Path.join(__DIR__, "../../assets/js/generated/server_types.ts")

  ChannelsWeb.TsTypes.Generator.generate(schema, output)
end
