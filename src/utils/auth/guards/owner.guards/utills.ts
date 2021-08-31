import { ExecutionContext } from '@nestjs/common';

const UserEntityIds = (context: ExecutionContext) => {
  const [req] = context.getArgs();

  return {
    entityID: req.params.id,
    userID: req.user.id,
  };
};

export { UserEntityIds };
