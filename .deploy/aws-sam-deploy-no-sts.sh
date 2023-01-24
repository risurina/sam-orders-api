aws s3api head-bucket --bucket ${AWS_SAM_S3_BUCKET}
if [ $? -ne 0 ]; then
  echo "Creating bucket ${AWS_SAM_S3_BUCKET}"
  aws s3api create-bucket --bucket ${AWS_SAM_S3_BUCKET} --region ${AWS_DEFAULT_REGION} --create-bucket-configuration LocationConstraint=${AWS_DEFAULT_REGION}
fi

sam deploy --no-confirm-changeset --no-fail-on-empty-changeset --capabilities CAPABILITY_IAM \
  --stack-name ${AWS_SAM_STACK_NAME} \
  --s3-bucket ${AWS_SAM_S3_BUCKET} \
  --s3-prefix ${AWS_SAM_S3_PREFIX} \
  --parameter-overrides ${AWS_SAM_PARAMS_OVERRIDES} \
  --region ${AWS_DEFAULT_REGION}